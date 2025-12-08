import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import AdminNav from "@/components/admin/AdminNav";
import { verifyAccess } from "@/libs/jwt";
import { isAdmin } from "@/libs/authz";
import { loadCourse } from "@/libs/pwCourse";
import {
  getReleaseMap,
  markModuleReleased,
  processDueReleases,
  sendReleaseEmails,
  upsertModuleRelease,
} from "@/libs/releases";
import type { ModuleReleaseState } from "@/libs/releases";

async function requireAdmin(): Promise<string> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  if (!token) {
    redirect("/");
  }

  try {
    const payload = await verifyAccess(token.value);
    if (!isAdmin(payload.email)) {
      redirect("/");
    }
    return payload.email;
  } catch {
    redirect("/");
  }
}

function toInputDateValue(iso: string | null | undefined): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

async function saveReleaseAction(formData: FormData): Promise<void> {
  "use server";
  const email = await requireAdmin();
  const moduleSlug = formData.get("moduleSlug")?.toString();
  if (!moduleSlug) {
    throw new Error("moduleSlug fehlt");
  }

  const sendEmail = formData.get("sendEmail") === "on";
  const releaseNow = formData.get("releaseNow") === "on";
  const releaseAtInput = formData.get("releaseAt")?.toString().trim();
  const releaseAt =
    releaseAtInput && !Number.isNaN(new Date(releaseAtInput).getTime())
      ? new Date(releaseAtInput).toISOString()
      : null;
  const emailTemplate =
    formData.get("emailTemplate")?.toString().trim() || null;

  const currentMap = await getReleaseMap();
  const current = currentMap[moduleSlug];
  const currentReleased = current?.released ?? current?.isReleased ?? true;
  let targetReleased = currentReleased;

  if (releaseNow) {
    await markModuleReleased(moduleSlug);
    if (sendEmail) {
      await sendReleaseEmails(moduleSlug, emailTemplate);
    }
  } else {
    if (releaseAt) {
      targetReleased = false;
    }
    await upsertModuleRelease({
      moduleSlug,
      releaseAt,
      released: targetReleased,
      sendEmail,
      emailTemplate,
      updatedBy: email,
    });
  }

  revalidatePath("/dashboard/admin/releases");
}

async function runDueReleasesAction() {
  "use server";
  await requireAdmin();
  await processDueReleases();
  revalidatePath("/dashboard/admin/releases");
}

function describeStatus(entry: ModuleReleaseState | undefined): string {
  if (!entry) return "Keine Planung (frei)";
  if (entry.isReleased) return "Freigeschaltet";
  if (entry.releaseAt) return `Geplant: ${new Date(entry.releaseAt).toLocaleString()}`;
  return "Gesperrt";
}

export default async function AdminReleasesPage() {
  const email = await requireAdmin();
  const course = loadCourse();
  const releaseMap = await getReleaseMap();

  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          Releases planen
        </h1>
        <p className="text-lg text-base-content/70">Admin: {email}</p>
      </div>

      <AdminNav active="releases" />

      <div className="flex flex-wrap gap-3 mb-8">
        <form action={runDueReleasesAction}>
          <button className="btn btn-outline btn-primary btn-sm" type="submit">
            Fällige Releases ausführen
          </button>
        </form>
      </div>

      <div className="space-y-6">
        {course.modules.map((mod) => {
          const entry = releaseMap[mod.slug];
          return (
            <section key={mod.slug} className="card bg-base-100 shadow">
              <div className="card-body space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <h2 className="card-title text-2xl">
                      {mod.order}. {mod.title}
                    </h2>
                    <p className="text-base-content/70 text-sm">
                      Status: {describeStatus(entry)}
                    </p>
                  </div>
                  <div className="text-sm text-base-content/60">
                    {mod.lessons.length} Lektionen
                  </div>
                </div>

                <form action={saveReleaseAction} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="hidden" name="moduleSlug" value={mod.slug} />

                  <label className="form-control">
                    <span className="label-text font-medium mb-1">
                      Geplantes Datum (UTC)
                    </span>
                    <input
                      type="datetime-local"
                      name="releaseAt"
                      defaultValue={toInputDateValue(entry?.releaseAt)}
                      className="input input-bordered"
                    />
                    <span className="text-xs text-base-content/60 mt-1">
                      Leer lassen für sofort freigeschaltet.
                    </span>
                  </label>

                  <label className="form-control md:col-span-2">
                    <span className="label-text font-medium mb-1">
                      E-Mail-Template (optional, HTML)
                    </span>
                    <textarea
                      name="emailTemplate"
                      defaultValue={entry?.emailTemplate || ""}
                      className="textarea textarea-bordered min-h-[140px]"
                      placeholder="Leer lassen, um das Standard-Template zu nutzen."
                    />
                  </label>

                  <div className="flex items-center gap-4 md:col-span-2">
                    <label className="label cursor-pointer">
                      <input
                        type="checkbox"
                        name="sendEmail"
                        className="checkbox checkbox-primary mr-2"
                        defaultChecked={entry?.sendEmail}
                      />
                      <span className="label-text">E-Mail versenden, wenn freigeschaltet</span>
                    </label>

                    <label className="label cursor-pointer">
                      <input
                        type="checkbox"
                        name="releaseNow"
                        className="checkbox mr-2"
                      />
                      <span className="label-text">Sofort freischalten</span>
                    </label>
                  </div>

                  <div className="flex gap-3 md:col-span-2">
                    <button className="btn btn-primary" type="submit">
                      Speichern
                    </button>
                  </div>
                </form>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
