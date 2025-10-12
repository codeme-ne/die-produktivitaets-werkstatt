/**
 * Course data mapper: CSV → Course structure
 * With in-memory caching
 */

import type { Course, Module, Lesson, Resource } from "@/types/course";
import { readPwCsv, type CsvRow } from "./pwCsv";
import { moduleSlug, slugifyTitle, parseModuleLesson } from "./slugs";
import { parseVideoUrl } from "./videoEmbed";

let cachedCourse: Course | null = null;

/**
 * Extract hostname from URL for resource labels
 */
function extractHostname(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/**
 * Convert CSV row to Lesson
 */
function csvRowToLesson(row: CsvRow): Lesson | null {
  const parsed = parseModuleLesson(row.Dateiname);
  if (!parsed.module) return null;

  const modSlug = moduleSlug(parsed.module);
  const lessonSlug = slugifyTitle(row.Titel) || `lektion-${parsed.lesson || 1}`;

  // Parse video info
  const video = row.Videos ? parseVideoUrl(row.Videos) : undefined;

  // Parse resources
  const resources: Resource[] = row.Links.map((href) => ({
    label: extractHostname(href),
    href,
  }));

  return {
    slug: lessonSlug,
    title: row.Titel || "Ohne Titel",
    order: parsed.lesson || 0,
    moduleSlug: modSlug,
    video,
    description: row.Beschreibung || "Beschreibung folgt.",
    resources,
  };
}

/**
 * Load and parse course data from CSV
 */
export function loadCourse(): Course {
  if (cachedCourse) return cachedCourse;

  const rows = readPwCsv();
  const lessonsMap = new Map<string, Lesson[]>();

  // Group lessons by module
  for (const row of rows) {
    const lesson = csvRowToLesson(row);
    if (!lesson) continue;

    const moduleKey = lesson.moduleSlug;
    if (!lessonsMap.has(moduleKey)) {
      lessonsMap.set(moduleKey, []);
    }
    lessonsMap.get(moduleKey)!.push(lesson);
  }

  // Build modules
  const modules: Module[] = [];
  for (const [modSlug, lessons] of lessonsMap.entries()) {
    // Sort lessons by order
    lessons.sort((a, b) => a.order - b.order);

    // Extract module number from slug (modul-01 → 1)
    const moduleNumber = parseInt(modSlug.split("-")[1], 10);

    // Generate module title from first lesson or fallback
    const firstLesson = lessons[0];
    const moduleTitle = `Woche ${moduleNumber}`;

    modules.push({
      slug: modSlug,
      title: moduleTitle,
      order: moduleNumber,
      lessons,
    });
  }

  // Sort modules by order
  modules.sort((a, b) => a.order - b.order);

  cachedCourse = { modules };
  return cachedCourse;
}

/**
 * Get course overview (modules with lesson count)
 */
export function getCourseOverview(): {
  slug: string;
  title: string;
  lessonCount: number;
}[] {
  const course = loadCourse();
  return course.modules.map((mod) => ({
    slug: mod.slug,
    title: mod.title,
    lessonCount: mod.lessons.length,
  }));
}

/**
 * Get single module by slug
 */
export function getModule(slug: string): Module | null {
  const course = loadCourse();
  return course.modules.find((m) => m.slug === slug) || null;
}

/**
 * Get single lesson by module and lesson slug
 */
export function getLesson(
  moduleSlug: string,
  lessonSlug: string,
): {
  lesson: Lesson;
  prev: { moduleSlug: string; lessonSlug: string } | null;
  next: { moduleSlug: string; lessonSlug: string } | null;
} | null {
  const course = loadCourse();
  const module = course.modules.find((m) => m.slug === moduleSlug);
  if (!module) return null;

  const lessonIndex = module.lessons.findIndex((l) => l.slug === lessonSlug);
  if (lessonIndex === -1) return null;

  const lesson = module.lessons[lessonIndex];

  // Prev/Next navigation
  let prev = null;
  let next = null;

  if (lessonIndex > 0) {
    const prevLesson = module.lessons[lessonIndex - 1];
    prev = { moduleSlug: module.slug, lessonSlug: prevLesson.slug };
  } else {
    // Check previous module
    const moduleIndex = course.modules.findIndex((m) => m.slug === moduleSlug);
    if (moduleIndex > 0) {
      const prevModule = course.modules[moduleIndex - 1];
      const lastLesson = prevModule.lessons[prevModule.lessons.length - 1];
      prev = { moduleSlug: prevModule.slug, lessonSlug: lastLesson.slug };
    }
  }

  if (lessonIndex < module.lessons.length - 1) {
    const nextLesson = module.lessons[lessonIndex + 1];
    next = { moduleSlug: module.slug, lessonSlug: nextLesson.slug };
  } else {
    // Check next module
    const moduleIndex = course.modules.findIndex((m) => m.slug === moduleSlug);
    if (moduleIndex < course.modules.length - 1) {
      const nextModule = course.modules[moduleIndex + 1];
      const firstLesson = nextModule.lessons[0];
      next = { moduleSlug: nextModule.slug, lessonSlug: firstLesson.slug };
    }
  }

  return { lesson, prev, next };
}

/**
 * Clear cache (useful for development/testing)
 */
export function clearCourseCache(): void {
  cachedCourse = null;
}
