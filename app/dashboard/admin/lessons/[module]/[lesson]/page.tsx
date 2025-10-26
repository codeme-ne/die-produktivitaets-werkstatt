import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { verifyAccess } from "@/libs/jwt";
import { isAdmin } from "@/libs/authz";
import AdminNav from "@/components/admin/AdminNav";
import LessonEditor from "./LessonEditor";
import {
  getLessonContent,
  listLessonBackups,
  toRelativePath,
  readLowConfidenceMap,
} from "@/libs/lessonContent";

interface Props {
  params: Promise<{ module: string; lesson: string }>;
}

export default async function LessonEditorPage({ params }: Props) {
  const { module, lesson } = await params;
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

  const lessonContent = getLessonContent(module, lesson);
  if (!lessonContent) {
    notFound();
  }

  const backups = listLessonBackups(module, lesson).map((path) =>
    toRelativePath(path),
  );
  const lowConfidenceEntry = readLowConfidenceMap().get(`${module}/${lesson}`);

  return (
    <main className="container mx-auto px-4 py-12 max-w-5xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Lesson Editor</h1>
        <p className="text-base-content/70">
          Admin: {email} · Modul {module} · Lektion {lesson}
        </p>
      </div>

      <AdminNav active="lessons" />

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/dashboard/admin/lessons"
          className="btn btn-sm btn-outline"
        >
          Zurück zur Übersicht
        </Link>
        {lowConfidenceEntry ? (
          <div className="badge badge-error badge-lg">
            Low-Confidence ({Math.round(lowConfidenceEntry.confidence * 100)}%)
          </div>
        ) : null}
      </div>

      <LessonEditor
        moduleSlug={module}
        lessonSlug={lesson}
        title={lessonContent.title}
        initialContent={lessonContent.content}
        initialSource={lessonContent.source}
        backups={backups}
      />
    </main>
  );
}
