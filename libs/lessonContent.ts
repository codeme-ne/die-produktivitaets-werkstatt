import "server-only";
import { existsSync, mkdirSync, readFileSync, readdirSync } from "fs";
import { join } from "path";
import { readPwCsv, type CsvRow } from "@/libs/pwCsv";
import { moduleSlug, parseModuleLesson, slugifyTitle } from "@/libs/slugs";

const LESSONS_ROOT = join(process.cwd(), "content", "lessons");
const LOW_CONFIDENCE_REPORT = join(
  process.cwd(),
  "reports",
  "low-confidence.json",
);

export type LessonContentSource = "file" | "csv";

export interface LessonContentResult {
  moduleSlug: string;
  lessonSlug: string;
  title: string;
  content: string;
  source: LessonContentSource;
}

export interface LowConfidenceEntry {
  module: string;
  lesson: string;
  title: string;
  confidence: number;
  reason: string;
}

export function resolveLessonPath(
  moduleSlugValue: string,
  lessonSlug: string,
): string {
  return join(LESSONS_ROOT, moduleSlugValue, `${lessonSlug}.md`);
}

export function ensureLessonDir(moduleSlugValue: string): void {
  const dir = join(LESSONS_ROOT, moduleSlugValue);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

export function readLessonFile(
  moduleSlugValue: string,
  lessonSlug: string,
): string | null {
  const filePath = resolveLessonPath(moduleSlugValue, lessonSlug);
  if (!existsSync(filePath)) return null;
  return readFileSync(filePath, "utf-8");
}

export function listLessonBackups(
  moduleSlugValue: string,
  lessonSlug: string,
): string[] {
  const dir = join(LESSONS_ROOT, moduleSlugValue);
  if (!existsSync(dir)) return [];

  const prefix = `${lessonSlug}.md.bak.`;
  const entries = readdirSync(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.startsWith(prefix))
    .map((entry) => join(dir, entry.name))
    .sort()
    .reverse();
}

export function toRelativePath(path: string): string {
  return path.replace(`${process.cwd()}/`, "");
}

export function formatCsvFallback(title: string, description: string): string {
  const heading = title ? `## ${title}` : "## Lektion";
  const content = description
    .replace(/\r\n/g, "\n")
    .replace(/""/g, '"')
    .replace(/[\u2022•]\s*/g, "- ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (!content) {
    return `${heading}\n`;
  }

  return `${heading}\n\n${content}\n`;
}

function findCsvRow(
  moduleSlugValue: string,
  lessonSlug: string,
  rows: CsvRow[],
): CsvRow | null {
  for (const row of rows) {
    const parsed = parseModuleLesson(row.Dateiname || "");
    if (!parsed.module) continue;

    const moduleCandidate = moduleSlug(parsed.module);
    if (moduleCandidate !== moduleSlugValue) continue;

    const candidateSlug =
      slugifyTitle(row.Titel) ||
      (parsed.lesson ? `lektion-${parsed.lesson}` : lessonSlug);

    if (candidateSlug === lessonSlug) {
      return row;
    }
  }

  return null;
}

export function getLessonContent(
  moduleSlugValue: string,
  lessonSlug: string,
): LessonContentResult | null {
  const fromFile = readLessonFile(moduleSlugValue, lessonSlug);
  if (fromFile !== null) {
    const rows = readPwCsv();
    const row = findCsvRow(moduleSlugValue, lessonSlug, rows);
    const title = row?.Titel || lessonSlug;
    return {
      moduleSlug: moduleSlugValue,
      lessonSlug,
      title,
      content: fromFile,
      source: "file",
    };
  }

  const rows = readPwCsv();
  const row = findCsvRow(moduleSlugValue, lessonSlug, rows);
  if (!row) {
    return null;
  }

  return {
    moduleSlug: moduleSlugValue,
    lessonSlug,
    title: row.Titel || lessonSlug,
    content: formatCsvFallback(row.Titel || lessonSlug, row.Beschreibung || ""),
    source: "csv",
  };
}

export function readLowConfidenceMap(): Map<string, LowConfidenceEntry> {
  const map = new Map<string, LowConfidenceEntry>();

  if (!existsSync(LOW_CONFIDENCE_REPORT)) {
    return map;
  }

  try {
    const raw = readFileSync(LOW_CONFIDENCE_REPORT, "utf-8");
    const data = JSON.parse(raw) as LowConfidenceEntry[];
    for (const entry of data) {
      const key = `${entry.module}/${entry.lesson}`;
      map.set(key, entry);
    }
  } catch (error) {
    console.warn("Failed to read low-confidence report", error);
  }

  return map;
}
