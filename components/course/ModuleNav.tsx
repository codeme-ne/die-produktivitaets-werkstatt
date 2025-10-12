import Link from "next/link";
import type { Lesson } from "@/types/course";

interface Props {
  moduleSlug: string;
  moduleTitle: string;
  lessons: Lesson[];
  currentSlug: string;
}

export function ModuleNav({
  moduleSlug,
  moduleTitle,
  lessons,
  currentSlug,
}: Props) {
  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title text-xl mb-4">{moduleTitle}</h2>
        <ul className="menu menu-sm p-0">
          {lessons.map((lesson) => {
            const isCurrent = lesson.slug === currentSlug;
            return (
              <li key={lesson.slug}>
                <Link
                  href={`/kurs/${moduleSlug}/${lesson.slug}`}
                  className={isCurrent ? "active" : ""}
                >
                  {lesson.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
