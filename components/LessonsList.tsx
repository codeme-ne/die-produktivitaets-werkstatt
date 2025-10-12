import Link from "next/link";

interface LessonItem {
  slug: string;
  order: number;
  title: string;
  summary: string;
}

interface LessonsListProps {
  lessons: LessonItem[];
  completed: Set<string>;
  nextOpenSlug?: string;
}

export default function LessonsList({
  lessons,
  completed,
  nextOpenSlug,
}: LessonsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {lessons.map((lesson) => {
        const isCompleted = completed.has(lesson.slug);
        const isNext = lesson.slug === nextOpenSlug;
        const isCurrent = isNext && !isCompleted;

        return (
          <Link
            key={lesson.slug}
            href={`/course/${lesson.slug}`}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
            aria-current={isCurrent ? "page" : undefined}
          >
            <div className="card-body">
              {/* Header with badge and status */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="badge badge-primary badge-outline">
                  Lektion {lesson.order}
                </div>

                <div className="flex gap-2">
                  {isCompleted && (
                    <div className="badge badge-success gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Erledigt
                    </div>
                  )}

                  {isNext && !isCompleted && (
                    <div className="badge badge-accent gap-2">Weiter →</div>
                  )}
                </div>
              </div>

              {/* Title and summary */}
              <h3 className="card-title text-lg">{lesson.title}</h3>
              <p className="text-base-content/70 text-sm">{lesson.summary}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
