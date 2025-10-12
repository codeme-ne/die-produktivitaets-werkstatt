import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getLessonBySlug,
  getNextLesson,
  getPreviousLesson,
  lessons,
} from "@/content/course2/manifest";

export async function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) {
    return { title: "Lektion nicht gefunden" };
  }
  return { title: `${lesson.title} - Kurs 2`, description: lesson.summary };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) notFound();

  const nextLesson = getNextLesson(slug);
  const previousLesson = getPreviousLesson(slug);
  const MdxContent = (await lesson.module()).default;

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="breadcrumbs text-sm mb-6">
        <ul>
          <li>
            <Link href="/course2" className="link link-hover">
              Kurs 2
            </Link>
          </li>
          <li>{lesson.title}</li>
        </ul>
      </div>

      <div className="mb-8">
        <div className="badge badge-primary mb-4">Lektion {lesson.order}</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{lesson.title}</h1>
        <p className="text-lg text-base-content/70">{lesson.summary}</p>
      </div>

      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body prose prose-lg max-w-none">
          <MdxContent />
        </div>
      </div>

      <div className="flex justify-between items-center gap-4">
        {previousLesson ? (
          <Link
            href={`/course2/${previousLesson.slug}`}
            className="btn btn-outline"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Zurück
          </Link>
        ) : (
          <div></div>
        )}

        <Link href="/course2" className="btn btn-ghost">
          Alle Lektionen
        </Link>

        {nextLesson ? (
          <Link
            href={`/course2/${nextLesson.slug}`}
            className="btn btn-primary"
          >
            Weiter
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
          <div className="badge badge-success badge-lg">
            Kurs abgeschlossen! 🎉
          </div>
        )}
      </div>
    </main>
  );
}
