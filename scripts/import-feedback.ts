#!/usr/bin/env tsx

/**
 * Import feedback CSV and push into Postgres (uses submitFeedback → sentiment via OpenRouter).
 *
 * Usage:
 *   npm run feedback:import -- --file=docs/feedback.csv
 *
 * CSV columns (header required):
 *   email,moduleSlug,lessonSlug,rating,message
 * - rating optional (1-5)
 * - moduleSlug/lessonSlug optional but recommended
 *
 * The script runs sequentially to avoid rate limit surprises on OpenRouter.
 */

import { readFileSync } from "fs";
import path from "path";
import { submitFeedback } from "@/libs/feedback";

type Row = {
  email: string;
  moduleSlug?: string | null;
  lessonSlug?: string | null;
  rating?: number | null;
  message: string;
};

function parseArgs(argv: string[]): { file?: string } {
  const result: { file?: string } = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--file=")) {
      result.file = arg.split("=")[1];
    } else if (arg === "--file") {
      result.file = argv[++i];
    }
  }
  return result;
}

function splitCsvLine(line: string, delimiter: string): string[] {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === "\"") {
      inQuotes = !inQuotes;
      continue;
    }
    if (char === delimiter && !inQuotes) {
      values.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  values.push(current);
  return values.map((v) => v.trim());
}

function parseCsv(filePath: string): Row[] {
  const content = readFileSync(filePath, "utf-8");
  const lines = content
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length < 2) {
    throw new Error("CSV hat keine Datenzeilen");
  }

  const delimiter = lines[0].includes(";") ? ";" : ",";
  const headers = splitCsvLine(lines[0], delimiter).map((h) => h.toLowerCase());

  const required = ["email", "message"];
  for (const key of required) {
    if (!headers.includes(key)) {
      throw new Error(`Header ${key} fehlt (gefunden: ${headers.join(", ")})`);
    }
  }

  const rows: Row[] = [];

  for (let i = 1; i < lines.length; i++) {
    const raw = splitCsvLine(lines[i], delimiter);
    const record: Record<string, string> = {};
    headers.forEach((h, idx) => {
      record[h] = raw[idx] || "";
    });

    const ratingRaw = record["rating"] || record["score"];
    const ratingParsed =
      ratingRaw && !Number.isNaN(Number(ratingRaw))
        ? Math.min(5, Math.max(1, Number(ratingRaw)))
        : null;

    rows.push({
      email: record["email"],
      moduleSlug: record["moduleslug"] || record["module"] || null,
      lessonSlug: record["lessonslug"] || record["lesson"] || null,
      rating: ratingParsed,
      message: record["message"],
    });
  }

  return rows;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.file) {
    console.error("Fehlender Parameter --file=/pfad/zur/csv");
    process.exit(1);
  }

  const absPath = path.isAbsolute(args.file)
    ? args.file
    : path.join(process.cwd(), args.file);

  const rows = parseCsv(absPath);
  console.log(`Importing ${rows.length} feedback rows from ${absPath} ...`);

  let success = 0;
  for (const row of rows) {
    try {
      await submitFeedback({
        email: row.email,
        moduleSlug: row.moduleSlug,
        lessonSlug: row.lessonSlug,
        rating: row.rating,
        message: row.message,
      });
      success += 1;
    } catch (error) {
      console.error("Import fehlgeschlagen:", error);
    }
  }

  console.log(`Fertig. Erfolgreich: ${success}/${rows.length}.`);
}

main().catch((error) => {
  console.error("Import-Abbruch:", error);
  process.exit(1);
});
