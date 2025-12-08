import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getLesson, loadCourse } from "@/libs/pwCourse";
import { isLessonDone } from "@/libs/pwProgress";
import { verifyAccess } from "@/libs/jwt";
import { getReleaseMapForProduct } from "@/libs/releases";
import { VideoHero } from "@/components/course/VideoHero";
import { VideoBody } from "@/components/course/VideoBody";
import { LessonActions } from "@/components/course/LessonActions";
import { KeyboardShortcuts } from "@/components/course/KeyboardShortcuts";
import { LessonFeedbackForm } from "@/components/course/LessonFeedbackForm";
import type { Metadata } from "next";
import { toPlainText } from "@/libs/markdown";
import { DEFAULT_PRODUCT, type CourseProduct } from "@/types/products";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ module: string; video: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { module, video } = await params;
  const data = getLesson(module, video);
  if (!data) return {};

  return {
    title: `${data.lesson.title} | Produktivitäts-Werkstatt`,
    description: toPlainText(data.lesson.description, 160),
  };
}

export async function generateStaticParams() {
  const course = loadCourse();
  const paths: { module: string; video: string }[] = [];

  for (const mod of course.modules) {
    for (const lesson of mod.lessons) {
      paths.push({
        module: mod.slug,
        video: lesson.slug,
      });
    }
  }

  return paths;
}

export default async function VideoPage({ params }: Props) {
  const { module, video } = await params;
  const data = getLesson(module, video);

  if (!data) {
    notFound();
  }

  const { lesson, prev, next } = data;
  const isLastInModule = !next || next.moduleSlug !== module;

  // Check progress status (direct file read, no HTTP call)
  let isDone = false;
  let productType: CourseProduct = DEFAULT_PRODUCT;
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    if (token) {
      const payload = await verifyAccess(token);
      productType = payload.productType || DEFAULT_PRODUCT;
      isDone = await isLessonDone(payload.email, module, video);
    }
  } catch {
    // Not logged in or invalid token
  }

  const releaseMap = await getReleaseMapForProduct(productType);
  const isReleased =
    productType === "self-paced" ||
    releaseMap[module]?.isReleased !== false;

  if (!isReleased) {
    redirect(`/kurs/${module}`);
  }

  return (
    <>
      <KeyboardShortcuts prev={prev} next={next} />
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6 max-w-7xl">
            <VideoHero title={lesson.title} video={lesson.video} />
            <VideoBody description={lesson.description} />
            {isLastInModule ? (
              <LessonFeedbackForm moduleSlug={module} lessonSlug={video} />
            ) : null}
          </div>
        </div>
        <LessonActions
          moduleSlug={module}
          lessonSlug={video}
          initialDone={isDone}
          prev={prev}
          next={next}
        />
      </div>
    </>
  );
}
