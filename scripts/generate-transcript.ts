#!/usr/bin/env tsx

/**
 * CLI wrapper around the transcript generator.
 *
 * Usage:
 *   npm run transcripts:generate -- --guid=<video-guid> [--language=de] [--model=medium]
 */

import { loadTranscriptIndex, hasTranscriptFile } from "@/libs/transcripts";
import { generateTranscript } from "@/libs/transcriptRunner";

type CliOptions = {
  guid?: string;
  input?: string;
  language: string;
  model?: string;
  whisperCommand?: string;
  whisperArgs: string[];
  overrideLibraryId?: string;
  dryRun: boolean;
  keepTemp: boolean;
};

const HELP_TEXT = `
Generate a subtitle file for a Bunny Stream video using Whisper.

Options:
  --guid=<uuid>            Bunny video GUID to transcribe (required unless --input)
  --input=/path/to/file    Use a local media file instead of downloading from Bunny
  --language=de            Language hint for Whisper (default: de)
  --model=medium           Whisper model (passed through to CLI)
  --whisper=whisper        Whisper CLI command name (default: whisper or WHISPER_COMMAND env)
  --library=<id>           Override Bunny library ID (fallback to env)
  --dry-run                Fetch metadata but skip Whisper execution
  --keep-temp              Preserve downloaded temp files for inspection
  --help                   Show this help

Environment:
  BUNNY_STREAM_LIBRARY_ID / BUNNY_LIBRARY_ID / NEXT_PUBLIC_BUNNY_LIBRARY_ID
  BUNNY_STREAM_ACCESS_KEY / BUNNY_STREAM_API_KEY
  WHISPER_COMMAND            Custom Whisper CLI command
  WHISPER_EXTRA_ARGS         Additional space-separated args appended to Whisper call
`.trim();

function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = {
    language: process.env.WHISPER_LANGUAGE || "de",
    whisperCommand: process.env.WHISPER_COMMAND,
    whisperArgs: [],
    dryRun: false,
    keepTemp: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    if (arg === "--help" || arg === "-h") {
      console.log(HELP_TEXT);
      process.exit(0);
    }

    if (arg.startsWith("--guid=")) {
      options.guid = arg.split("=")[1];
    } else if (arg === "--guid") {
      options.guid = argv[++i];
    } else if (arg.startsWith("--input=")) {
      options.input = arg.split("=")[1];
    } else if (arg === "--input") {
      options.input = argv[++i];
    } else if (arg.startsWith("--language=")) {
      options.language = arg.split("=")[1];
    } else if (arg === "--language") {
      options.language = argv[++i];
    } else if (arg.startsWith("--model=")) {
      options.model = arg.split("=")[1];
    } else if (arg === "--model") {
      options.model = argv[++i];
    } else if (arg.startsWith("--whisper=")) {
      options.whisperCommand = arg.split("=")[1];
    } else if (arg === "--whisper") {
      options.whisperCommand = argv[++i];
    } else if (arg.startsWith("--library=")) {
      options.overrideLibraryId = arg.split("=")[1];
    } else if (arg === "--library") {
      options.overrideLibraryId = argv[++i];
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--keep-temp") {
      options.keepTemp = true;
    } else if (arg.startsWith("--")) {
      options.whisperArgs.push(arg);
    } else {
      options.whisperArgs.push(arg);
    }
  }

  if (!options.guid && !options.input) {
    throw new Error("Missing --guid or --input. Run with --help for usage.");
  }

  if (process.env.WHISPER_EXTRA_ARGS) {
    options.whisperArgs.push(...process.env.WHISPER_EXTRA_ARGS.split(/\s+/).filter(Boolean));
  }

  return options;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (!options.guid) {
    throw new Error("Missing --guid. Provide the Bunny video GUID to name the transcript file.");
  }
  const libraryId =
    options.overrideLibraryId ||
    process.env.BUNNY_STREAM_LIBRARY_ID ||
    process.env.BUNNY_LIBRARY_ID ||
    process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID;
  const accessKey =
    process.env.BUNNY_STREAM_ACCESS_KEY || process.env.BUNNY_STREAM_API_KEY;

  if (!options.input) {
    if (!libraryId) {
      throw new Error("Missing Bunny library ID (set BUNNY_STREAM_LIBRARY_ID).");
    }
    if (!accessKey) {
      throw new Error(
        "Missing Bunny access key. Set BUNNY_STREAM_ACCESS_KEY (library access key).",
      );
    }
  }

  const logger = (line: string) => {
    if (line.trim()) {
      console.log(line);
    }
  };

  console.log(
    `▶️  Generating transcript for ${options.guid ? options.guid : "local input"} (${options.language})`,
  );

  const result = await generateTranscript({
    guid: options.guid!,
    language: options.language,
    model: options.model,
    libraryId,
    accessKey,
    inputPath: options.input,
    whisperCommand: options.whisperCommand,
    whisperArgs: options.whisperArgs,
    dryRun: options.dryRun,
    keepTemp: options.keepTemp,
    logger,
  });

  if (options.dryRun) {
    console.log("Dry run completed. No transcript file was written.");
    return;
  }

  console.log(`✅  Transcript ready at ${result.transcriptPath}`);
  const index = loadTranscriptIndex();
  const meta = index[options.guid!];
  if (meta) {
    console.log(`ℹ️  Metadata updated: ${JSON.stringify(meta, null, 2)}`);
  }
  if (options.guid && hasTranscriptFile(options.guid)) {
    console.log("   Stored in content/transcripts/index.json");
  }
}

main().catch((error) => {
  console.error("⚠️  Transcript generation failed:", error.message);
  process.exit(1);
});
