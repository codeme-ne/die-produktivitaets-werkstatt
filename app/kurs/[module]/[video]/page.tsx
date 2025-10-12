import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getLesson, getModule, loadCourse } from "@/libs/pwCourse";
import { isLessonDone } from "@/libs/pwProgress";
import { verifyAccess } from "@/libs/jwt";
import { VideoHero } from "@/components/course/VideoHero";
import { VideoBody } from "@/components/course/VideoBody";
import { ModuleNav } from "@/components/course/ModuleNav";
import { MarkDoneButton } from "@/components/course/MarkDoneButton";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ module: string; video: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { module, video } = await params;
  const data = getLesson(module, video);
  if (!data) return {};

  return {
    title: `${data.lesson.title} | Produktivitäts-Werkstatt`,
    description: data.lesson.description.slice(0, 160),
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
  const mod = getModule(module);

  if (!data || !mod) {
    notFound();
  }

  const { lesson, prev, next } = data;

  // Check progress status (direct file read, no HTTP call)
  let isDone = false;
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    if (token) {
      const payload = await verifyAccess(token);
      isDone = isLessonDone(payload.email, module, video);
    }
  } catch {
    // Not logged in or invalid token
  }

  return (
    <main className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Breadcrumb */}
        <div className="breadcrumbs text-sm mb-8">
          <ul>
            <li>
              <Link href="/kurs">Kurs</Link>
            </li>
            <li>
              <Link href={`/kurs/${module}`}>{mod.title}</Link>
            </li>
            <li>{lesson.title}</li>
          </ul>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <VideoHero title={lesson.title} video={lesson.video} />

            {/* Mark Done Button */}
            <div className="mb-8">
              <MarkDoneButton
                moduleSlug={module}
                videoSlug={video}
                initialDone={isDone}
              />
            </div>

            <VideoBody
              description={lesson.description}
              resources={lesson.resources}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ModuleNav
              moduleSlug={mod.slug}
              moduleTitle={mod.title}
              lessons={mod.lessons}
              currentSlug={lesson.slug}
            />
          </div>
        </div>

        {/* Prev/Next Navigation */}
        <div className="mt-12 flex justify-between items-center">
          {prev ? (
            <Link
              href={`/kurs/${prev.moduleSlug}/${prev.lessonSlug}`}
              className="btn btn-outline gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Vorherige Lektion
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/kurs/${next.moduleSlug}/${next.lessonSlug}`}
              className="btn btn-primary gap-2"
            >
              Nächste Lektion
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </main>
  );
}
