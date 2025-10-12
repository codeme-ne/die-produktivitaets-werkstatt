/**
 * Server-side progress reading (direct file access, no HTTP)
 */

import { readFileSync } from "fs";
import { join } from "path";

interface ProgressData {
  [email: string]: {
    [key: string]: boolean; // key: "module/video"
  };
}

const PROGRESS_FILE = join(process.cwd(), "logs", "progress.json");

export function getProgressForUser(email: string): Record<string, boolean> {
  try {
    const content = readFileSync(PROGRESS_FILE, "utf-8");
    const data: ProgressData = JSON.parse(content);
    return data[email] || {};
  } catch {
    return {};
  }
}

export function isLessonDone(
  email: string,
  moduleSlug: string,
  videoSlug: string,
): boolean {
  const progress = getProgressForUser(email);
  const key = `${moduleSlug}/${videoSlug}`;
  return progress[key] === true;
}
