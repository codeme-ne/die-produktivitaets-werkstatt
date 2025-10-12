import Link from "next/link";
import { notFound } from "next/navigation";
import { getModule, loadCourse } from "@/libs/pwCourse";
import { formatSimple, extractTeaser } from "@/libs/formatText";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ module: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { module } = await params;
  const mod = getModule(module);
  if (!mod) return {};

  return {
    title: `${mod.title} | Produktivitäts-Werkstatt`,
    description: `Alle Lektionen von ${mod.title}`,
  };
}

export async function generateStaticParams() {
  const course = loadCourse();
  return course.modules.map((mod) => ({
    module: mod.slug,
  }));
}

export default async function ModulePage({ params }: Props) {
  const { module } = await params;
  const mod = getModule(module);

  if (!mod) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Breadcrumb */}
        <div className="breadcrumbs text-sm mb-8">
          <ul>
            <li>
              <Link href="/kurs">Kurs</Link>
            </li>
            <li>{mod.title}</li>
          </ul>
        </div>

        {/* Module Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">{mod.title}</h1>
          <p className="text-base-content/70">
            {mod.lessons.length} Lektion{mod.lessons.length !== 1 ? "en" : ""}
          </p>
        </div>

        {/* Lessons List */}
        <div className="space-y-4">
          {mod.lessons.map((lesson) => {
            // Generate HTML-formatted teaser from description
            const formattedHtml = formatSimple(lesson.description);
            const teaser = extractTeaser(formattedHtml, 160);

            return (
              <Link
                key={lesson.slug}
                href={`/kurs/${mod.slug}/${lesson.slug}`}
                className="card bg-base-100 shadow hover:shadow-lg transition-shadow"
              >
                <div className="card-body">
                  <h2 className="card-title text-xl">{lesson.title}</h2>
                  {lesson.video && (
                    <div className="badge badge-primary badge-sm">Video</div>
                  )}
                  <p className="text-sm text-base-content/70">{teaser}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Back to Overview */}
        <div className="mt-12 text-center">
          <Link href="/kurs" className="btn btn-ghost">
            ← Zurück zur Übersicht
          </Link>
        </div>
      </div>
    </main>
  );
}
