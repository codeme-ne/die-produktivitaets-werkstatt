import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { lessons } from "@/content/course2/manifest";

export default function Course2Page() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Kurs 2 – Curriculum
        </h1>
        <p className="text-lg text-base-content/70">
          Willkommen! Wähle eine Lektion, um fortzufahren.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-6">Lektionen</h2>
        {lessons.map((lesson) => (
          <Link
            key={lesson.slug}
            href={`/course2/${lesson.slug}`}
            className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="card-body">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">
                      {lesson.order}
                    </span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="card-title text-xl mb-2">{lesson.title}</h3>
                  <p className="text-base-content/70">{lesson.summary}</p>
                </div>
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

      <div className="mt-12 text-center">
        <LogoutButton />
      </div>
    </main>
  );
}
