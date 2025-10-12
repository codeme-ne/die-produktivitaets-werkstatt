/**
 * Slug generation utilities for course system
 */

/**
 * Generate module slug from module number
 * @example moduleSlug(1) => "modul-01"
 */
export function moduleSlug(num: number): string {
  return `modul-${num.toString().padStart(2, "0")}`;
}

/**
 * Slugify a title: convert to lowercase, replace umlauts, remove special chars
 * @example slugifyTitle("👋 Willkommen in der PW") => "willkommen-in-der-pw"
 */
export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Parse module and lesson number from filename
 * @example parseModuleLesson("PW_W01_L02_Mindset") => { module: 1, lesson: 2, name: "Mindset" }
 */
export function parseModuleLesson(fileName: string): {
  module: number | null;
  lesson: number | null;
  name: string;
} {
  const moduleMatch = fileName.match(/W(\d+)/i);
  const lessonMatch = fileName.match(/L(\d+)/i);
  const nameMatch = fileName.split("_").pop() || "";

  return {
    module: moduleMatch ? parseInt(moduleMatch[1], 10) : null,
    lesson: lessonMatch ? parseInt(lessonMatch[1], 10) : null,
    name: nameMatch,
  };
}
