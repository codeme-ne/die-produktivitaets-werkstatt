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
  error?: string;
}> {
  try {
    await requireAdmin();

    const data = await listVideos({ page: 1, perPage: 25 });
    return { success: true, data };
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
