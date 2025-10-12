import Link from "next/link";
import { lessons } from "@/content/lessons/manifest";
import LogoutButton from "@/components/LogoutButton";

export default function CoursePage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          AI-Kurs Curriculum
        </h1>
        <p className="text-lg text-base-content/70">
          Willkommen zurück! Wähle eine Lektion, um fortzufahren.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Kursfortschritt</h2>
          <div className="flex items-center gap-4">
            <div
              className="radial-progress text-primary"
              style={{ "--value": 0 } as any}
            >
              0%
            </div>
            <div>
              <p className="text-sm text-base-content/70">
                0 von {lessons.length} Lektionen abgeschlossen
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-6">Lektionen</h2>

        {lessons.map((lesson) => (
          <Link
            key={lesson.slug}
            href={`/course/${lesson.slug}`}
            className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="card-body">
              <div className="flex items-start gap-4">
                {/* Lesson Number */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">
                      {lesson.order}
                    </span>
                  </div>
                </div>

                {/* Lesson Content */}
                <div className="flex-grow">
                  <h3 className="card-title text-xl mb-2">{lesson.title}</h3>
                  <p className="text-base-content/70">{lesson.summary}</p>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 self-center">
                  <svg
                    className="w-6 h-6 text-base-content/50"
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
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Logout Button */}
      <div className="mt-12 text-center">
        <LogoutButton />
      </div>
    </main>
  );
}
