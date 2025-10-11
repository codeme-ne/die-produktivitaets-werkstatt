import { cookies } from 'next/headers';

/**
 * Progress data structure stored in httpOnly cookie
 */
export interface ProgressData {
  completed: string[]; // Array of completed lesson slugs
}

const PROGRESS_COOKIE_NAME = 'progress';
const MAX_AGE = 31536000; // 365 days

/**
 * Read progress from httpOnly cookie (server-side only)
 */
export async function readProgress(): Promise<ProgressData> {
  const cookieStore = await cookies();
  const progressCookie = cookieStore.get(PROGRESS_COOKIE_NAME);

  if (!progressCookie?.value) {
    return { completed: [] };
  }

  try {
    const data = JSON.parse(progressCookie.value);

    // Validate structure
    if (!data || typeof data !== 'object' || !Array.isArray(data.completed)) {
      return { completed: [] };
    }

    // Validate all items are strings
    const validated = data.completed.filter((item: unknown) => typeof item === 'string');

    return { completed: validated };
  } catch {
    return { completed: [] };
  }
}

/**
 * Write progress to httpOnly cookie (server-side only)
 */
export async function writeProgress(data: ProgressData): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(PROGRESS_COOKIE_NAME, JSON.stringify(data), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE,
  });
}

/**
 * Mark a lesson as completed (idempotent)
 */
export async function completeLesson(slug: string): Promise<ProgressData> {
  // Input validation
  if (!slug || typeof slug !== 'string' || slug.trim().length === 0) {
    throw new Error('Invalid lesson slug');
  }

  const progress = await readProgress();

  // Idempotent: only add if not already completed
  if (!progress.completed.includes(slug)) {
    progress.completed.push(slug);
    await writeProgress(progress);
  }

  return progress;
}

/**
 * Unmark a lesson as completed (for undo functionality)
 */
export async function undoLesson(slug: string): Promise<ProgressData> {
  // Input validation
  if (!slug || typeof slug !== 'string' || slug.trim().length === 0) {
    throw new Error('Invalid lesson slug');
  }

  const progress = await readProgress();
  progress.completed = progress.completed.filter((s) => s !== slug);
  await writeProgress(progress);

  return progress;
}

/**
 * Check if a specific lesson is completed
 */
export async function isLessonCompleted(slug: string): Promise<boolean> {
  const progress = await readProgress();
  return progress.completed.includes(slug);
}

/**
 * Get completion statistics
 */
export async function getCompletionStats(totalLessons: number): Promise<{
  completed: number;
  total: number;
  percentage: number;
}> {
  const progress = await readProgress();
  const completed = progress.completed.length;
  const percentage = totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;

  return {
    completed,
    total: totalLessons,
    percentage,
  };
}
