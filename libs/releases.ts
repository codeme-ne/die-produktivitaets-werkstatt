import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { sql } from "@vercel/postgres";
import { loadCourse } from "@/libs/pwCourse";
import { listActiveParticipants } from "@/libs/participants";
import { moduleReleaseEmail, moduleReleaseSubject } from "@/emails/moduleRelease";
import { DEFAULT_PRODUCT, type CourseProduct } from "@/types/products";

export interface ModuleRelease {
  moduleSlug: string;
  releaseAt: string | null;
  released: boolean;
  releasedAt?: string | null;
  sendEmail: boolean;
  emailTemplate?: string | null;
  updatedBy?: string | null;
  updatedAt?: string | null;
}

export interface ModuleReleaseState extends ModuleRelease {
  isReleased: boolean;
}

const FILE = join(process.cwd(), "logs", "module-releases.json");
const LOGS_DIR = dirname(FILE);
const hasDb =
  !!process.env.DATABASE_URL ||
  !!process.env.POSTGRES_URL ||
  !!process.env.VERCEL_POSTGRES_URL;

let dbInitialized = false;

function ensureLogsDir() {
  if (!existsSync(LOGS_DIR)) {
    mkdirSync(LOGS_DIR, { recursive: true });
  }
}

async function ensureDb() {
  if (!hasDb || dbInitialized) return;
  await sql`
    CREATE TABLE IF NOT EXISTS module_releases (
      module_slug TEXT PRIMARY KEY,
      release_at TIMESTAMPTZ NULL,
      released BOOLEAN NOT NULL DEFAULT TRUE,
      released_at TIMESTAMPTZ NULL,
      send_email BOOLEAN NOT NULL DEFAULT FALSE,
      email_template TEXT,
      updated_by TEXT,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  dbInitialized = true;
}

function readFileStore(): Record<string, ModuleRelease> {
  try {
    const content = readFileSync(FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    return {};
  }
}

function writeFileStore(data: Record<string, ModuleRelease>) {
  ensureLogsDir();
  const tmp = `${FILE}.tmp`;
  writeFileSync(tmp, JSON.stringify(data, null, 2), "utf-8");
  renameSync(tmp, FILE);
}

function defaultRelease(moduleSlug: string): ModuleRelease {
  return {
    moduleSlug,
    releaseAt: null,
    released: true, // keep existing behaviour unless explicitly scheduled
    releasedAt: null,
    sendEmail: false,
    emailTemplate: null,
    updatedAt: new Date().toISOString(),
  };
}

function withComputed(entry: ModuleRelease, now: Date): ModuleReleaseState {
  const isReleased =
    entry.released ||
    (!!entry.releaseAt && new Date(entry.releaseAt).getTime() <= now.getTime());
  return { ...entry, isReleased };
}

async function readStoredReleases(): Promise<Record<string, ModuleRelease>> {
  if (hasDb) {
    await ensureDb();
    const rows =
      await sql`SELECT module_slug, release_at, released, released_at, send_email, email_template, updated_by, updated_at FROM module_releases`;
    const map: Record<string, ModuleRelease> = {};
    for (const row of rows.rows) {
      map[row.module_slug] = {
        moduleSlug: row.module_slug,
        releaseAt: row.release_at ? row.release_at.toISOString() : null,
        released: row.released === true,
        releasedAt: row.released_at ? row.released_at.toISOString() : null,
        sendEmail: row.send_email === true,
        emailTemplate: row.email_template || null,
        updatedBy: row.updated_by || null,
        updatedAt: row.updated_at ? row.updated_at.toISOString() : null,
      };
    }
    return map;
  }

  return readFileStore();
}

async function persistRelease(entry: ModuleRelease) {
  if (hasDb) {
    await ensureDb();
    await sql`
      INSERT INTO module_releases (module_slug, release_at, released, released_at, send_email, email_template, updated_by)
      VALUES (${entry.moduleSlug}, ${entry.releaseAt}, ${entry.released}, ${entry.releasedAt}, ${entry.sendEmail}, ${entry.emailTemplate}, ${entry.updatedBy})
      ON CONFLICT (module_slug)
      DO UPDATE SET
        release_at = EXCLUDED.release_at,
        released = EXCLUDED.released,
        released_at = EXCLUDED.released_at,
        send_email = EXCLUDED.send_email,
        email_template = EXCLUDED.email_template,
        updated_by = EXCLUDED.updated_by,
        updated_at = NOW();
    `;
    return;
  }

  const map = readFileStore();
  map[entry.moduleSlug] = entry;
  writeFileStore(map);
}

export async function getReleaseMap(): Promise<Record<string, ModuleReleaseState>> {
  const now = new Date();
  const stored = await readStoredReleases();
  const course = loadCourse();
  const map: Record<string, ModuleReleaseState> = {};

  for (const mod of course.modules) {
    const base = stored[mod.slug] || defaultRelease(mod.slug);
    map[mod.slug] = withComputed(base, now);
  }

  return map;
}

export async function getReleaseMapForProduct(
  productType: CourseProduct = DEFAULT_PRODUCT,
): Promise<Record<string, ModuleReleaseState>> {
  const map = await getReleaseMap();
  if (productType === "self-paced") {
    const released: Record<string, ModuleReleaseState> = {};
    for (const [slug, entry] of Object.entries(map)) {
      released[slug] = { ...entry, isReleased: true, released: true };
    }
    return released;
  }
  return map;
}

export async function upsertModuleRelease(input: {
  moduleSlug: string;
  releaseAt?: string | null;
  released?: boolean;
  sendEmail?: boolean;
  emailTemplate?: string | null;
  updatedBy?: string | null;
}): Promise<ModuleReleaseState> {
  const now = new Date();
  const map = await getReleaseMap();
  const current = map[input.moduleSlug] || defaultRelease(input.moduleSlug);

  const next: ModuleRelease = {
    moduleSlug: input.moduleSlug,
    releaseAt:
      input.releaseAt === undefined ? current.releaseAt : input.releaseAt,
    released:
      input.released === undefined ? current.released : input.released,
    releasedAt: current.releasedAt,
    sendEmail:
      input.sendEmail === undefined ? current.sendEmail : input.sendEmail,
    emailTemplate:
      input.emailTemplate === undefined
        ? current.emailTemplate || null
        : input.emailTemplate,
    updatedBy: input.updatedBy || current.updatedBy,
    updatedAt: now.toISOString(),
  };

  await persistRelease(next);
  return withComputed(next, now);
}

export async function markModuleReleased(moduleSlug: string): Promise<ModuleReleaseState> {
  const now = new Date();
  const map = await getReleaseMap();
  const current = map[moduleSlug] || defaultRelease(moduleSlug);

  const next: ModuleRelease = {
    ...current,
    released: true,
    releasedAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };

  await persistRelease(next);
  return withComputed(next, now);
}

function buildLessonLink(moduleSlug: string): string {
  const course = loadCourse();
  const mod = course.modules.find((m) => m.slug === moduleSlug);
  if (!mod) return "";

  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const targetLesson = mod.lessons[0];
  if (!targetLesson) {
    return `${base}/kurs/${moduleSlug}`;
  }

  return `${base}/kurs/${moduleSlug}/${targetLesson.slug}`;
}

export async function sendReleaseEmails(moduleSlug: string, templateOverride?: string | null) {
  const course = loadCourse();
  const mod = course.modules.find((m) => m.slug === moduleSlug);
  if (!mod) return;

  const participants = await listActiveParticipants("live");
  if (participants.length === 0) return;

  const { sendEmail } = await import("@/libs/resend");
  const moduleLink = buildLessonLink(moduleSlug);
  const subject = moduleReleaseSubject(mod.title);
  const html =
    templateOverride ||
    moduleReleaseEmail({
      moduleTitle: mod.title,
      moduleOrder: mod.order,
      moduleLink,
    });

  // Send sequentially to keep Resend quotas simple
  for (const participant of participants) {
    try {
      await sendEmail({
        to: participant.email,
        subject,
        text: `Modul ${mod.order}: ${mod.title} ist jetzt freigeschaltet. Hier geht es weiter: ${moduleLink}`,
        html,
      });
    } catch (err) {
      console.error("Release email failed", {
        email: participant.email,
        module: moduleSlug,
        error: err,
      });
    }
  }
}

export async function processDueReleases() {
  const now = new Date();
  const map = await getReleaseMap();

  for (const [moduleSlug, entry] of Object.entries(map)) {
    if (entry.released) continue;
    if (!entry.releaseAt) continue;

    const releaseTime = new Date(entry.releaseAt);
    if (releaseTime.getTime() <= now.getTime()) {
      await markModuleReleased(moduleSlug);
      if (entry.sendEmail) {
        await sendReleaseEmails(moduleSlug, entry.emailTemplate);
      }
    }
  }
}
