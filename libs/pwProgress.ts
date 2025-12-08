/**
 * Progress storage with optional Postgres backend (Vercel Postgres).
 * Falls back to file-based storage for local/dev if no DB env is set.
 */

import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { sql } from "@vercel/postgres";
import { withLock } from "@/libs/mutex";

type ProgressMap = Record<string, boolean>;

const PROGRESS_FILE = join(process.cwd(), "logs", "progress.json");
const LOGS_DIR = dirname(PROGRESS_FILE);
const hasDb =
  !!process.env.DATABASE_URL ||
  !!process.env.POSTGRES_URL ||
  !!process.env.VERCEL_POSTGRES_URL;
const isProd = process.env.NODE_ENV === "production";
const requireDbInProd = isProd;

let dbInitialized = false;

async function ensureDb() {
  if (!hasDb || dbInitialized) return;
  await sql`
    CREATE TABLE IF NOT EXISTS progress_state (
      email TEXT NOT NULL,
      module_slug TEXT NOT NULL,
      lesson_slug TEXT NOT NULL,
      done BOOLEAN NOT NULL DEFAULT TRUE,
      version BIGINT NOT NULL DEFAULT 1,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      PRIMARY KEY (email, module_slug, lesson_slug)
    );
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS progress_log (
      id BIGSERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      module_slug TEXT NOT NULL,
      lesson_slug TEXT NOT NULL,
      done BOOLEAN NOT NULL,
      version BIGINT NOT NULL,
      source_ip TEXT,
      user_agent TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  dbInitialized = true;
}

function ensureLogsDir() {
  if (!existsSync(LOGS_DIR)) {
    mkdirSync(LOGS_DIR, { recursive: true });
  }
}

function readProgressFile(): Record<string, ProgressMap> {
  try {
    const content = readFileSync(PROGRESS_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    return {};
  }
}

function writeProgressFile(data: Record<string, ProgressMap>) {
  ensureLogsDir();
  const tmp = `${PROGRESS_FILE}.tmp`;
  writeFileSync(tmp, JSON.stringify(data, null, 2), "utf-8");
  renameSync(tmp, PROGRESS_FILE);
}

export async function getProgressForUser(email: string): Promise<ProgressMap> {
  if (requireDbInProd && !hasDb) {
    throw new Error("Progress-DB nicht konfiguriert (setze DATABASE_URL/POSTGRES_URL/VERCEL_POSTGRES_URL)");
  }

  if (hasDb) {
    await ensureDb();
    const rows =
      await sql`SELECT module_slug, lesson_slug, done FROM progress_state WHERE email = ${email}`;
    const map: ProgressMap = {};
    for (const row of rows.rows) {
      const key = `${row.module_slug}/${row.lesson_slug}`;
      map[key] = row.done === true;
    }
    return map;
  }

  const data = readProgressFile();
  return data[email] || {};
}

export async function setProgressEntry(options: {
  email: string;
  moduleSlug: string;
  videoSlug: string;
  done: boolean;
  sourceIp?: string | null;
  userAgent?: string | null;
}): Promise<{ key: string; done: boolean; version?: number }> {
  if (requireDbInProd && !hasDb) {
    throw new Error("Progress-DB nicht konfiguriert (setze DATABASE_URL/POSTGRES_URL/VERCEL_POSTGRES_URL)");
  }

  const { email, moduleSlug, videoSlug, done, sourceIp, userAgent } = options;
  const key = `${moduleSlug}/${videoSlug}`;

  if (hasDb) {
    await ensureDb();
    // Upsert progress and increment version on updates
    const upsert = await sql`
      INSERT INTO progress_state (email, module_slug, lesson_slug, done)
      VALUES (${email}, ${moduleSlug}, ${videoSlug}, ${done})
      ON CONFLICT (email, module_slug, lesson_slug)
      DO UPDATE SET done = EXCLUDED.done, version = progress_state.version + 1, updated_at = NOW()
      RETURNING version;
    `;
    const version = upsert.rows[0]?.version as number | undefined;

    // Audit log
    await sql`
      INSERT INTO progress_log (email, module_slug, lesson_slug, done, version, source_ip, user_agent)
      VALUES (${email}, ${moduleSlug}, ${videoSlug}, ${done}, ${version ?? 1}, ${sourceIp || null}, ${userAgent || null});
    `;

    return { key, done, version };
  }

  // File fallback with lock
  await withLock("progress-file", async () => {
    const data = readProgressFile();
    if (!data[email]) data[email] = {};
    data[email][key] = done;
    writeProgressFile(data);
  });

  return { key, done };
}

export async function isLessonDone(
  email: string,
  moduleSlug: string,
  videoSlug: string,
): Promise<boolean> {
  const progress = await getProgressForUser(email);
  const key = `${moduleSlug}/${videoSlug}`;
  return progress[key] === true;
}
