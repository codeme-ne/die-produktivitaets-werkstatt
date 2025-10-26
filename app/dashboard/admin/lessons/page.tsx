import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { verifyAccess } from "@/libs/jwt";
import { isAdmin } from "@/libs/authz";
import { loadCourse } from "@/libs/pwCourse";
import AdminNav from "@/components/admin/AdminNav";
import {
  readLessonFile,
  readLowConfidenceMap,
  type LowConfidenceEntry,
} from "@/libs/lessonContent";

interface LessonRow {
  order: number;
  title: string;
  slug: string;
  status: "file" | "csv" | "low";
  badgeClass: string;
  badgeLabel: string;
  confidenceLabel: string;
  detail?: string;
}

function mapStatus(
  fileExists: boolean,
  lowEntry: LowConfidenceEntry | undefined,
): {
  status: LessonRow["status"];
  badgeClass: string;
  badgeLabel: string;
  confidenceLabel: string;
  detail?: string;
} {
  if (!fileExists) {
    return {
      status: "csv",
      badgeClass: "badge-warning",
      badgeLabel: "CSV-Fallback",
      confidenceLabel: lowEntry
        ? `${Math.round(lowEntry.confidence * 100)}%`
        : "—",
      detail: lowEntry?.reason === "csv-fallback" ? "Kein Markdown vorhanden" : undefined,
    };
  }

  if (lowEntry && lowEntry.reason !== "csv-fallback") {
    return {
      status: "low",
      badgeClass: "badge-error",
      badgeLabel: "Low-Confidence",
      confidenceLabel: `${Math.round(lowEntry.confidence * 100)}%`,
      detail: "Bitte Sichtprüfung durchführen",
    };
  }

  return {
    status: "file",
    badgeClass: "badge-success",
    badgeLabel: "Datei vorhanden",
    confidenceLabel: "—",
  };
}

export default async function AdminLessonsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  if (!token) {
    redirect("/");
  }

  let email: string;
  try {
    const payload = await verifyAccess(token.value);
    email = payload.email;
  } catch {
    redirect("/");
  }

  if (!isAdmin(email)) {
    redirect("/");
  }

  const course = loadCourse();
  const lowConfidenceMap = readLowConfidenceMap();

  let totalFile = 0;
  let totalCsv = 0;
  let totalLow = 0;

  const modules = course.modules.map((module) => {
    const rows: LessonRow[] = module.lessons.map((lesson, index) => {
      const key = `${module.slug}/${lesson.slug}`;
      const fileExists = readLessonFile(module.slug, lesson.slug) !== null;
      const lowEntry = lowConfidenceMap.get(key);
      const mapped = mapStatus(fileExists, lowEntry);

      if (mapped.status === "file") totalFile += 1;
      if (mapped.status === "csv") totalCsv += 1;
      if (mapped.status === "low") totalLow += 1;

      return {
        order: lesson.order || index + 1,
        title: lesson.title,
        slug: lesson.slug,
        ...mapped,
      };
    });

    return { moduleTitle: module.title, moduleSlug: module.slug, lessons: rows };
  });

  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          Lessons-Verwaltung
        </h1>
        <p className="text-lg text-base-content/70">Admin: {email}</p>
      </div>

      <AdminNav active="lessons" />

      <div className="stats stats-vertical md:stats-horizontal shadow mb-10 bg-base-100">
        <div className="stat">
          <div className="stat-title">Markdown-Dateien</div>
          <div className="stat-value text-success">{totalFile}</div>
        </div>
        <div className="stat">
          <div className="stat-title">CSV-Fallbacks</div>
          <div className="stat-value text-warning">{totalCsv}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Low-Confidence</div>
          <div className="stat-value text-error">{totalLow}</div>
        </div>
      </div>

      <div className="space-y-10">
        {modules.map((module) => (
          <section key={module.moduleSlug} className="card bg-base-100 shadow">
            <div className="card-body">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <h2 className="card-title text-2xl">
                    {module.moduleTitle} ({module.moduleSlug})
                  </h2>
                  <p className="text-base-content/70">
                    {module.lessons.length} Lektionen
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Lektion</th>
                      <th>Status</th>
                      <th>Confidence</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {module.lessons.map((lesson) => (
                      <tr key={lesson.slug}>
                        <td className="font-mono">{lesson.order}</td>
                        <td>
                          <div className="font-medium">{lesson.title}</div>
                          <div className="text-sm text-base-content/60">
                            {lesson.slug}
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${lesson.badgeClass}`}>
                            {lesson.badgeLabel}
                          </span>
                          {lesson.detail ? (
                            <div className="text-xs text-base-content/60 mt-1">
                              {lesson.detail}
                            </div>
                          ) : null}
                        </td>
                        <td>{lesson.confidenceLabel}</td>
                        <td className="text-right">
                          <Link
                            href={`/dashboard/admin/lessons/${module.moduleSlug}/${lesson.slug}`}
                            className="btn btn-sm btn-primary"
                          >
                            Bearbeiten
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
