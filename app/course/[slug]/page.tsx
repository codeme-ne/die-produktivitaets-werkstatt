import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getLessonBySlug, getNextLesson, getPreviousLesson, getNextOpenLesson, lessons } from '@/content/lessons/manifest';
import { isLessonCompleted, readProgress } from '@/libs/progress';
import LessonControls from '@/components/LessonControls';

// Temporarily disable static generation to debug MDX issue
// export async function generateStaticParams() {
//   return lessons.map((lesson) => ({
//     slug: lesson.slug,
//   }));
// }

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  
  if (!lesson) {
    return {
      title: 'Lektion nicht gefunden',
    };
  }
  
  return {
    title: `${lesson.title} - AI-Kurs`,
    description: lesson.summary,
  };
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);

  if (!lesson) {
    notFound();
  }

  const nextLesson = getNextLesson(slug);
  const previousLesson = getPreviousLesson(slug);
  const isCompleted = await isLessonCompleted(slug);
  
  // Get progress for "Weiterlernen" feature
  const progress = await readProgress();
  const completedSet = new Set(progress.completed);
  const nextOpenLesson = getNextOpenLesson(completedSet);
  const allCompleted = completedSet.size === lessons.length;

  // Dynamically import the MDX content
  const MdxContent = (await lesson.module()).default;
  
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <div className="breadcrumbs text-sm mb-6">
        <ul>
          <li>
            <Link href="/course" className="link link-hover">
              Kurs
            </Link>
          </li>
          <li>{lesson.title}</li>
        </ul>
      </div>

      {/* Lesson Header */}
      <div className="mb-8">
        <div className="badge badge-primary mb-4">Lektion {lesson.order}</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{lesson.title}</h1>
        <p className="text-lg text-base-content/70">{lesson.summary}</p>
      </div>

      {/* Lesson Content */}
      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body prose prose-lg max-w-none">
          <MdxContent />
        </div>
      </div>

      {/* Completion Controls */}
      <div className="mb-8">
        <LessonControls slug={slug} isCompleted={isCompleted} />
      </div>

      {/* Weiterlernen CTA */}
      {nextOpenLesson && nextOpenLesson.slug !== slug && (
        <div className="card bg-primary text-primary-content shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title">Weiterlernen →</h2>
            <p>Bereit für die nächste Lektion?</p>
            <div className="card-actions justify-end">
              <Link
                href={`/course/${nextOpenLesson.slug}`}
                className="btn btn-secondary"
              >
                {nextOpenLesson.title}
              </Link>
            </div>
          </div>
        </div>
      )}

      {allCompleted && (
        <div className="alert alert-success mb-8">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-bold">Kurs abgeschlossen! 🎉</span>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center gap-4">
        {previousLesson ? (
          <Link
            href={`/course/${previousLesson.slug}`}
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

        <Link href="/course" className="btn btn-ghost">
          Alle Lektionen
        </Link>

        {nextLesson ? (
          <Link
            href={`/course/${nextLesson.slug}`}
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
          <div className="badge badge-success badge-lg">Kurs abgeschlossen! 🎉</div>
        )}
      </div>
    </main>
  );
}
