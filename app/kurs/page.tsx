import Link from "next/link";
import { getCourseOverview } from "@/libs/pwCourse";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kursübersicht | Produktivitäts-Werkstatt",
  description: "Alle Module der Produktivitäts-Werkstatt im Überblick",
};

export default function KursPage() {
  const modules = getCourseOverview();

  return (
    <main className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Produktivitäts-Werkstatt
          </h1>
          <p className="text-lg text-base-content/70">
            12 Wochen zu mehr Produktivität und Lebensfreude
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => (
            <Link
              key={mod.slug}
              href={`/kurs/${mod.slug}`}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="card-body">
                <h2 className="card-title text-2xl">{mod.title}</h2>
                <p className="text-base-content/70">
                  {mod.lessonCount} Lektion{mod.lessonCount !== 1 ? "en" : ""}
                </p>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary btn-sm">
                    Zum Modul →
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Back to Dashboard */}
        <div className="mt-12 text-center">
          <Link href="/dashboard" className="btn btn-ghost">
            ← Zurück zum Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
