import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { loadCourse } from "@/libs/pwCourse";
import { listTranscriptGuids } from "@/libs/transcripts";
import type { CourseProduct } from "@/types/products";
import { getReleaseMapForProduct } from "@/libs/releases";

export interface SearchResult {
  moduleSlug: string;
  lessonSlug: string;
  title: string;
  excerpt: string;
  score: number;
  source: "lesson" | "transcript";
}

const TRANSCRIPTS_DIR = join(process.cwd(), "content", "transcripts");

function normalize(text: string): string {
  return text.replace(/\s+/g, " ").trim().toLowerCase();
}

function readTranscriptText(guid: string): string {
  const path = join(TRANSCRIPTS_DIR, `${guid}.vtt`);
  if (!existsSync(path)) return "";
  const raw = readFileSync(path, "utf-8");
  return raw
    .split("\n")
    .filter((line) => {
      const trimmed = line.trim();
      if (!trimmed) return false;
      if (/^\d+$/.test(trimmed)) return false;
      if (trimmed.includes("-->")) return false;
      return true;
    })
    .join(" ");
}

function scoreText(text: string, queryTokens: string[]): number {
  if (!text) return 0;
  const haystack = normalize(text);
  let score = 0;
  for (const token of queryTokens) {
    if (!token) continue;
    if (haystack.includes(token)) {
      score += 2;
    }
  }
  return score;
}

function buildExcerpt(text: string, queryTokens: string[], length = 200): string {
  const haystack = text.trim();
  if (!haystack) return "";

  let idx = -1;
  for (const token of queryTokens) {
    const found = haystack.toLowerCase().indexOf(token);
    if (found !== -1) {
      idx = found;
      break;
    }
  }

  if (idx === -1) {
    return haystack.slice(0, length);
  }

  const start = Math.max(0, idx - length / 4);
  return haystack.slice(start, start + length);
}

export async function searchCourseContent(options: {
  query: string;
  productType: CourseProduct;
}): Promise<SearchResult[]> {
  const tokens = normalize(options.query)
    .split(" ")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 8);
  if (tokens.length === 0) return [];

  const course = loadCourse();
  const releaseMap = await getReleaseMapForProduct(options.productType);
  const transcriptGuids = new Set(listTranscriptGuids());
  const results: SearchResult[] = [];

  for (const mod of course.modules) {
    const release = releaseMap[mod.slug];
    if (!release?.isReleased) continue;

    for (const lesson of mod.lessons) {
      const baseScore = scoreText(`${lesson.title} ${lesson.description}`, tokens);
      if (baseScore > 0) {
        results.push({
          moduleSlug: mod.slug,
          lessonSlug: lesson.slug,
          title: lesson.title,
          excerpt: buildExcerpt(lesson.description, tokens),
          score: baseScore,
          source: "lesson",
        });
      }

      if (lesson.video && transcriptGuids.has(lesson.video.guid)) {
        const text = readTranscriptText(lesson.video.guid);
        const tScore = scoreText(text, tokens);
        if (tScore > 0) {
          results.push({
            moduleSlug: mod.slug,
            lessonSlug: lesson.slug,
            title: lesson.title,
            excerpt: buildExcerpt(text, tokens),
            score: tScore + 1,
            source: "transcript",
          });
        }
      }
    }
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 25);
}
