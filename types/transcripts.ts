export interface TranscriptMeta {
  language: string;
  generatedAt: string;
  model?: string;
  source?: string;
  notes?: string;
}

export type TranscriptIndex = Record<string, TranscriptMeta>;

export interface TranscriptStatus {
  guid: string;
  exists: boolean;
  meta?: TranscriptMeta;
}
