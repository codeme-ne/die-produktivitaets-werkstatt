import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccess } from "@/libs/jwt";
import { loadCourse, getNextOpenLesson } from "@/libs/pwCourse";
import { getProgressForUser } from "@/libs/pwProgress";
import { CourseProvider } from "./CourseContext";
import { CourseLayoutClient } from "./CourseLayoutClient";

export default async function CourseLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Verify JWT and get user email
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  if (!token) {
    redirect("/");
  }

  let email: string;
  try {
    const payload = await verifyAccess(token.value);
    email = payload.email;
  } catch {
    redirect("/");
  }

  // Load course data and progress
  const course = loadCourse();
  const progressMap = getProgressForUser(email);
  const nextOpenLesson = getNextOpenLesson(progressMap);

  return (
    <CourseProvider
      course={course}
      initialProgress={progressMap}
      initialNextOpen={nextOpenLesson}
    >
      <CourseLayoutClient email={email}>{children}</CourseLayoutClient>
    </CourseProvider>
  );
}
