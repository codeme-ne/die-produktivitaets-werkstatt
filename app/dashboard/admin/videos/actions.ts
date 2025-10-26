"use server";

import { cookies } from "next/headers";
import { verifyAccess } from "@/libs/jwt";
import { isAdmin } from "@/libs/authz";
import {
  createVideo,
  ingestFromUrl,
  listVideos,
  BunnyListResponse,
  BunnyVideo,
} from "@/libs/bunnyStream";
import { getTranscriptStatuses } from "@/libs/transcripts";
import { generateTranscript } from "@/libs/transcriptRunner";
import type { TranscriptStatus } from "@/types/transcripts";

/**
 * Get admin email from JWT token
 * Throws if not authenticated or not admin
 */
async function requireAdmin(): Promise<string> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  if (!token) {
    throw new Error("Nicht authentifiziert");
  }

  let email: string;
  try {
    const payload = await verifyAccess(token.value);
    email = payload.email;
  } catch {
    throw new Error("Ungültiges Token");
  }

  if (!isAdmin(email)) {
    throw new Error("Keine Admin-Berechtigung");
  }

  return email;
}

/**
 * Create a video and start ingesting from URL
 * @returns Video GUID and ingest result
 */
export async function createAndIngestAction(input: {
  title: string;
  url: string;
}): Promise<{
  success: boolean;
  guid?: string;
  error?: string;
}> {
  try {
    await requireAdmin();

    // Validate inputs
    if (!input.title?.trim()) {
      return { success: false, error: "Titel ist erforderlich" };
    }
    if (!input.url?.trim()) {
      return { success: false, error: "URL ist erforderlich" };
    }

    // Create video metadata
    const video = await createVideo({ title: input.title.trim() });

    // Start URL ingest
    await ingestFromUrl(video.guid, input.url.trim());

    return { success: true, guid: video.guid };
  } catch (e: any) {
    return { success: false, error: e?.message || "Unbekannter Fehler" };
  }
}

/**
 * List all videos (first 25)
 */
export async function listVideosAction(): Promise<{
  success: boolean;
  data?: BunnyListResponse;
  transcripts?: TranscriptStatus[];
  error?: string;
}> {
  try {
    await requireAdmin();

    const data = await listVideos({ page: 1, perPage: 25 });
    const transcripts = data?.items
      ? getTranscriptStatuses(data.items.map((video) => video.guid))
      : [];
    return { success: true, data, transcripts };
  } catch (e: any) {
    return { success: false, error: e?.message || "Unbekannter Fehler" };
  }
}

/**
 * Get a single video by ID (for status checks)
 */
export async function getVideoAction(videoId: string): Promise<{
  success: boolean;
  video?: BunnyVideo;
  error?: string;
}> {
  try {
    await requireAdmin();

    // Bunny API doesn't have a single-video endpoint in our SDK
    // so we list all and find the one we need
    const list = await listVideos({ page: 1, perPage: 100 });
    const video = list.items.find((v) => v.guid === videoId);

    if (!video) {
      return { success: false, error: "Video nicht gefunden" };
    }

    return { success: true, video };
  } catch (e: any) {
    return { success: false, error: e?.message || "Unbekannter Fehler" };
  }
}

/**
 * Generate (or regenerate) a transcript for a video using Whisper CLI.
 */
export async function generateTranscriptAction(input: {
  guid: string;
  language?: string;
  model?: string;
  dryRun?: boolean;
}): Promise<{
  success: boolean;
  transcript?: TranscriptStatus;
  logs?: string;
  error?: string;
}> {
  try {
    await requireAdmin();

    const guid = input.guid?.trim();
    if (!guid) {
      return { success: false, error: "GUID ist erforderlich" };
    }

    const logs: string[] = [];
    const whisperArgs =
      process.env.WHISPER_EXTRA_ARGS?.split(/\s+/).filter(Boolean) ?? [];

    await generateTranscript({
      guid,
      language: input.language || process.env.WHISPER_LANGUAGE || "de",
      model: input.model,
      libraryId:
        process.env.BUNNY_STREAM_LIBRARY_ID ||
        process.env.BUNNY_LIBRARY_ID ||
        process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID,
      accessKey:
        process.env.BUNNY_STREAM_ACCESS_KEY || process.env.BUNNY_STREAM_API_KEY,
      whisperCommand: process.env.WHISPER_COMMAND,
      whisperArgs,
      dryRun: input.dryRun,
      logger: (line) => logs.push(line),
    });

    const [status] = getTranscriptStatuses([guid]);
    return {
      success: true,
      transcript: status,
      logs: logs.join("\n"),
    };
  } catch (e: any) {
    return { success: false, error: e?.message || "Unbekannter Fehler" };
  }
}
