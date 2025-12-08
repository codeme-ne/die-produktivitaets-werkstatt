import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccess } from "@/libs/jwt";
import { loadCourse, getNextOpenLesson } from "@/libs/pwCourse";
import { getProgressForUser } from "@/libs/pwProgress";
import { getReleaseMapForProduct } from "@/libs/releases";
import type { CourseProduct } from "@/types/products";
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
  let productType: CourseProduct;
  try {
    const payload = await verifyAccess(token.value);
    email = payload.email;
    productType = payload.productType || "live";
  } catch {
    redirect("/");
  }

  // Load course data and progress
  const course = loadCourse();
  const progressMap = await getProgressForUser(email);
  const releaseMap = await getReleaseMapForProduct(productType);
  const nextOpenLesson = getNextOpenLesson(progressMap, releaseMap, productType);

  return (
    <CourseProvider
      course={course}
      initialProgress={progressMap}
      initialNextOpen={nextOpenLesson}
      productType={productType}
      releaseMap={releaseMap}
    >
      <CourseLayoutClient>{children}</CourseLayoutClient>
    </CourseProvider>
  );
}
