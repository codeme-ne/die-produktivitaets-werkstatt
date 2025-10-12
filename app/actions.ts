"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  completeLesson as completeLessonHelper,
  undoLesson as undoLessonHelper,
  readProgress,
} from "@/libs/progress";
import { verifyAccess } from "@/libs/jwt";
import { sendEmail } from "@/libs/resend";
import { completionEmail, completionEmailSubject } from "@/emails/completion";
import { lessons } from "@/content/lessons/manifest";
import config from "@/config";

/**
 * Server Action: Log out user by clearing JWT cookie
 */
export async function logoutUser() {
  // Clear the JWT cookie (httpOnly)
  (await cookies()).delete("access_token");

  // Redirect to home page after logout
  redirect("/");
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
    const totalLessons = lessons.length;
    const result = await completeLessonHelper(slug, totalLessons);

    // Send completion email if course just completed
    if (result.shouldNotifyCompletion) {
      try {
        // Get email from JWT
        const cookieStore = await cookies();
        const token = cookieStore.get("access_token")?.value;

        if (token) {
          const payload = await verifyAccess(token);
          const dashboardLink = `${process.env.NEXT_PUBLIC_SITE_URL || `https://${config.domainName}`}/dashboard`;

          await sendEmail({
            to: payload.email,
            subject: completionEmailSubject,
            text: "Glückwunsch! Du hast den AI-Kurs erfolgreich abgeschlossen.",
            html: completionEmail(dashboardLink),
          });
        }
      } catch (emailError) {
        // Log error but don't fail the action
        console.error("Failed to send completion email:", emailError);
      }
    }

    // Revalidate affected routes
    revalidatePath("/course");
    revalidatePath("/dashboard");
    revalidatePath(`/course/${slug}`);

    return { success: true, progress: result.progress };
  } catch (error) {
    console.error("Failed to complete lesson:", error);
    return { success: false, error: "Failed to mark lesson as completed" };
  }
}

/**
 * Server action: Undo lesson completion
 */
export async function undoLessonAction(slug: string) {
  try {
    const progress = await undoLessonHelper(slug);

    // Revalidate affected routes
    revalidatePath("/course");
    revalidatePath("/dashboard");
    revalidatePath(`/course/${slug}`);

    return { success: true, progress };
  } catch (error) {
    console.error("Failed to undo lesson:", error);
    return { success: false, error: "Failed to undo lesson completion" };
  }
}
