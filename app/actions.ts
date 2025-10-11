'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { completeLesson as completeLessonHelper, undoLesson as undoLessonHelper, readProgress } from '@/libs/progress';

/**
 * Server Action: Log out user by clearing JWT cookie
 */
export async function logoutUser() {
  // Clear the JWT cookie (httpOnly)
  (await cookies()).delete('access_token');

  // Redirect to home page after logout
  redirect('/');
}

/**
 * Server action: Get current progress (for client components)
 */
export async function getProgress() {
  return await readProgress();
}

/**
 * Server action: Mark lesson as completed
 */
export async function completeLessonAction(slug: string) {
  try {
    const progress = await completeLessonHelper(slug);

    // Revalidate affected routes
    revalidatePath('/course');
    revalidatePath('/dashboard');
    revalidatePath(`/course/${slug}`);

    return { success: true, progress };
  } catch (error) {
    console.error('Failed to complete lesson:', error);
    return { success: false, error: 'Failed to mark lesson as completed' };
  }
}

/**
 * Server action: Undo lesson completion
 */
export async function undoLessonAction(slug: string) {
  try {
    const progress = await undoLessonHelper(slug);

    // Revalidate affected routes
    revalidatePath('/course');
    revalidatePath('/dashboard');
    revalidatePath(`/course/${slug}`);

    return { success: true, progress };
  } catch (error) {
    console.error('Failed to undo lesson:', error);
    return { success: false, error: 'Failed to undo lesson completion' };
  }
}
