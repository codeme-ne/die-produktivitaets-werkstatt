/**
 * Helpers for reading and writing Whisper transcript metadata.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import type {
  TranscriptIndex,
  TranscriptMeta,
  TranscriptStatus,
} from "@/types/transcripts";

const TRANSCRIPTS_DIR = join(process.cwd(), "content", "transcripts");
const TRANSCRIPTS_INDEX = join(TRANSCRIPTS_DIR, "index.json");

function ensureDirectory() {
  if (!existsSync(TRANSCRIPTS_DIR)) {
    mkdirSync(TRANSCRIPTS_DIR, { recursive: true });
  }
}

function safeParseIndex(content: string): TranscriptIndex {
  try {
    return JSON.parse(content) as TranscriptIndex;
  } catch {
    return {};
  }
}

export function loadTranscriptIndex(): TranscriptIndex {
  ensureDirectory();

  if (!existsSync(TRANSCRIPTS_INDEX)) {
    return {};
  }

  const raw = readFileSync(TRANSCRIPTS_INDEX, "utf-8");
  if (!raw.trim()) {
    return {};
  }

  return safeParseIndex(raw);
}

export function saveTranscriptIndex(index: TranscriptIndex) {
  ensureDirectory();
  const serialized = JSON.stringify(index, null, 2);
  writeFileSync(TRANSCRIPTS_INDEX, `${serialized}\n`, "utf-8");
}

export function getTranscriptMeta(guid: string): TranscriptMeta | null {
  const index = loadTranscriptIndex();
  return index[guid] ?? null;
}

export function upsertTranscriptMeta(guid: string, meta: TranscriptMeta) {
  const index = loadTranscriptIndex();
  index[guid] = meta;
  saveTranscriptIndex(index);
}

export function deleteTranscriptMeta(guid: string) {
  const index = loadTranscriptIndex();
  if (index[guid]) {
    delete index[guid];
    saveTranscriptIndex(index);
  }
}

export function getTranscriptPath(guid: string, extension = "vtt") {
  ensureDirectory();
  return join(TRANSCRIPTS_DIR, `${guid}.${extension}`);
}

export function hasTranscriptFile(guid: string, extension = "vtt") {
  return existsSync(getTranscriptPath(guid, extension));
}

export function listTranscriptGuids(): string[] {
  return Object.keys(loadTranscriptIndex());
}

export function getTranscriptStatuses(
  guids: string[],
  extension = "vtt",
): TranscriptStatus[] {
  const index = loadTranscriptIndex();
  return guids.map((guid) => ({
    guid,
    exists: hasTranscriptFile(guid, extension),
    meta: index[guid],
  }));
}
