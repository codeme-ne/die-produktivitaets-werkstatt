#!/usr/bin/env tsx
/**
 * Importiert Fortschritt aus logs/progress.json in Vercel Postgres.
 * Erwartet gesetzte DB-Env (POSTGRES_URL/ DATABASE_URL/ VERCEL_POSTGRES_URL).
 */
import { sql } from "@vercel/postgres";
import fs from "fs";
import path from "path";

type ProgressMap = Record<string, boolean>;
type ProgressFile = Record<string, ProgressMap>;

async function ensureTables() {
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
}

async function main() {
  const dbUrl =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.VERCEL_POSTGRES_URL;
  if (!dbUrl) {
    throw new Error("Keine Datenbank-URL gesetzt (DATABASE_URL/POSTGRES_URL/VERCEL_POSTGRES_URL).");
  }

  const filePath = path.join(process.cwd(), "logs", "progress.json");
  if (!fs.existsSync(filePath)) {
    console.log("Keine progress.json gefunden, nichts zu migrieren.");
    return;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const data: ProgressFile = JSON.parse(raw);
  const entries: { email: string; moduleSlug: string; lessonSlug: string }[] =
    [];

  for (const [email, map] of Object.entries(data)) {
    for (const [key, done] of Object.entries(map)) {
      if (!done) continue;
      const [moduleSlug, lessonSlug] = key.split("/", 2);
      if (!moduleSlug || !lessonSlug) continue;
      entries.push({ email, moduleSlug, lessonSlug });
    }
  }

  console.log(`Importiere ${entries.length} Einträge ...`);
  if (entries.length === 0) return;

  await ensureTables();

  for (const entry of entries) {
    const { email, moduleSlug, lessonSlug } = entry;
    await sql`
      INSERT INTO progress_state (email, module_slug, lesson_slug, done, version)
      VALUES (${email}, ${moduleSlug}, ${lessonSlug}, TRUE, 1)
      ON CONFLICT (email, module_slug, lesson_slug)
      DO UPDATE SET done = TRUE, version = progress_state.version + 1, updated_at = NOW();
    `;
    await sql`
      INSERT INTO progress_log (email, module_slug, lesson_slug, done, version, source_ip, user_agent)
      VALUES (${email}, ${moduleSlug}, ${lessonSlug}, TRUE, 1, 'import', 'progress-import');
    `;
  }

  console.log("Migration abgeschlossen.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
