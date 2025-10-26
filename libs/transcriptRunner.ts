import {
  mkdtempSync,
  rmSync,
  createWriteStream,
  existsSync,
  readdirSync,
} from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import { spawn } from "child_process";
import {
  getTranscriptPath,
  upsertTranscriptMeta,
  loadTranscriptIndex,
} from "@/libs/transcripts";
import type { TranscriptMeta } from "@/types/transcripts";

export interface GenerateTranscriptOptions {
  guid: string;
  language: string;
  libraryId?: string;
  accessKey?: string;
  whisperCommand?: string;
  whisperArgs?: string[];
  model?: string;
  inputPath?: string;
  dryRun?: boolean;
  keepTemp?: boolean;
  logger?: (message: string) => void;
}

export interface GenerateTranscriptResult {
  transcriptPath: string;
  meta?: TranscriptMeta;
  downloadUrl?: string;
  stdout: string;
  stderr: string;
}

type BunnyVideoResponse = {
  guid: string;
  title?: string;
  length?: number;
  downloadUrl?: string;
  storageHost?: string;
  host?: string;
  originalVideoUrl?: string;
  transcodingStatus?: {
    downloadUrl?: string;
  };
  [key: string]: any;
};

async function fetchVideoMetadata(
  libraryId: string,
  guid: string,
  accessKey: string,
): Promise<BunnyVideoResponse> {
  const endpoint = `https://video.bunnycdn.com/library/${libraryId}/videos/${guid}`;
  const res = await fetch(endpoint, {
    headers: {
      AccessKey: accessKey,
      accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch video metadata (${res.status} ${res.statusText})`);
  }

  return (await res.json()) as BunnyVideoResponse;
}

function extractDownloadUrl(meta: BunnyVideoResponse): string | null {
  const candidates: Array<string | undefined> = [
    meta.downloadUrl,
    meta.transcodingStatus?.downloadUrl,
    meta.originalVideoUrl,
    meta.directPlayUrl,
    meta.originalVideoFileUrl,
    meta.resilientDownloadUrl,
  ];

  for (const url of candidates) {
    if (url && typeof url === "string") {
      return url;
    }
  }

  const host = meta.storageHost || meta.host;
  if (host && meta.guid) {
    return `https://${host}/${meta.guid}/${meta.guid}/play_720p.mp4`;
  }

  return null;
}

async function downloadToTemp(url: string, destination: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Download failed (${res.status} ${res.statusText})`);
  }
  if (!res.body) {
    throw new Error("Download stream missing body");
  }

  await pipeline(Readable.fromWeb(res.body as any), createWriteStream(destination));
}

async function runWhisper(
  command: string,
  args: string[],
  logger?: (message: string) => void,
  dryRun?: boolean,
) {
  if (dryRun) {
    logger?.(`[dry-run] ${command} ${args.join(" ")}`);
    return { stdout: "", stderr: "" };
  }

  return await new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
    const child = spawn(command, args, { stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";

    child.stdout?.on("data", (chunk) => {
      const text = chunk.toString();
      stdout += text;
      logger?.(text.trimEnd());
    });
    child.stderr?.on("data", (chunk) => {
      const text = chunk.toString();
      stderr += text;
      logger?.(text.trimEnd());
    });

    child.on("error", (error) => {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        reject(
          new Error(
            `Whisper command "${command}" not found. Install whisper/faster-whisper CLI or set WHISPER_COMMAND.`,
          ),
        );
      } else {
        reject(error);
      }
    });

    child.on("exit", (code) => {
      if (code === 0) resolve({ stdout, stderr });
      else reject(new Error(`Whisper exited with code ${code}`));
    });
  });
}

export async function generateTranscript(
  options: GenerateTranscriptOptions,
): Promise<GenerateTranscriptResult> {
  const {
    guid,
    language,
    libraryId,
    accessKey,
    whisperCommand = "whisper",
    whisperArgs = [],
    model,
    inputPath,
    dryRun,
    keepTemp,
    logger,
  } = options;

  const log = (message: string) => {
    if (message.trim()) {
      logger?.(message);
    }
  };

  const index = loadTranscriptIndex();
  const previous = index[guid];

  let resolvedInput = inputPath;
  let downloadUrl: string | undefined;
  let tempDir: string | null = null;

  if (!resolvedInput) {
    if (!libraryId) {
      throw new Error("Missing Bunny library ID. Provide options.libraryId or env var.");
    }
    if (!accessKey) {
      throw new Error("Missing Bunny access key. Provide options.accessKey or env var.");
    }

    log(`Fetching video metadata for ${guid}...`);
    const meta = await fetchVideoMetadata(libraryId, guid, accessKey);
    downloadUrl = extractDownloadUrl(meta) ?? undefined;
    if (!downloadUrl) {
      log(`Metadata keys: ${Object.keys(meta).join(", ")}`);
      throw new Error("Unable to determine downloadable video URL from Bunny metadata.");
    }

    tempDir = mkdtempSync(join(tmpdir(), "transcript-"));
    resolvedInput = join(tempDir, `${guid}.mp4`);
    log("Downloading video from Bunny...");
    await downloadToTemp(downloadUrl, resolvedInput);
    log(`Saved source video to ${resolvedInput}`);
  } else {
    log(`Using local input file ${resolvedInput}`);
  }

  const transcriptsDir = join(process.cwd(), "content", "transcripts");
  const transcriptPath = getTranscriptPath(guid);
  const whisperCmdArgs = [
    resolvedInput,
    "--output_dir",
    transcriptsDir,
    "--output_format",
    "vtt",
    "--task",
    "transcribe",
    "--language",
    language,
    ...whisperArgs,
  ];

  if (model) {
    whisperCmdArgs.push("--model", model);
  }

  log(`Running ${whisperCommand} ${whisperCmdArgs.join(" ")}`);
  const { stdout, stderr } = await runWhisper(whisperCommand, whisperCmdArgs, log, dryRun);

  if (!dryRun) {
    if (!existsSync(transcriptPath)) {
      const fallback = readdirSync(transcriptsDir).find((file) => file === `${guid}.vtt`);
      if (!fallback) {
        throw new Error(`Expected transcript ${transcriptPath} not found. Check Whisper output.`);
      }
    }

    const meta: TranscriptMeta = {
      language,
      generatedAt: new Date().toISOString(),
      model,
      source: downloadUrl ?? (inputPath ? "local-file" : "unknown"),
      notes: previous ? `Replaced previous transcript from ${previous.generatedAt}` : undefined,
    };
    upsertTranscriptMeta(guid, meta);
  }

  if (tempDir && !keepTemp) {
    rmSync(tempDir, { recursive: true, force: true });
  }

  return {
    transcriptPath,
    meta: dryRun ? undefined : loadTranscriptIndex()[guid],
    downloadUrl,
    stdout,
    stderr,
  };
}
