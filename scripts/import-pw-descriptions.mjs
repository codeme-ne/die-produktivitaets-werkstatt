#!/usr/bin/env node
/**
 * Import PW video descriptions from MD source
 *
 * Usage:
 *   npm run meta:import -- --dry-run  # Preview changes
 *   npm run meta:import               # Apply changes
 *
 * Requires env (optional for image listing):
 *   BUNNY_STORAGE_ZONE, BUNNY_STORAGE_ACCESS_KEY
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// Keyword sets for each module (baseline scoring)
const MODULE_KEYWORDS = {
  "01": [
    "willkommen",
    "produktivitäts-werkstatt",
    "katalyst",
    "transformation",
    "lukas zangerl",
    "erste woche",
    "fundament",
  ],
  "02": [
    "fokussierte stunden",
    "fokusstunden",
    "aktivierungsmenü",
    "fokus-logbuch",
    "4 reiter",
    "konzentration",
    "prokrastination",
  ],
  "03": [
    "lebenskompass",
    "nordstern",
    "grabrede",
    "löffelliste",
    "langfristige vision",
    "mission statement",
  ],
  "04": [
    "produktiver tag",
    "morgen-manifest",
    "abendliches abschalten",
    "tagesstruktur",
    "primen",
    "planen",
  ],
  "05": [
    "zukunftsskizze",
    "vision board",
    "3-jahres",
    "odyssee",
    "reticular",
    "große ziele",
  ],
  "06": [
    "ausgeglichene woche",
    "wochenplan",
    "wöchentlich",
    "ideale woche",
    "balance",
  ],
  "07": [
    "quartals-missionen",
    "zps-methode",
    "bereiche",
    "projekte",
    "aufgaben",
    "90 tage",
    "hierarchie",
  ],
  // Für 08–10 wurden Keywords präzisiert, generische Begriffe entfernt
  "08": [
    "schlaf",
    "schlafqualität",
    "schlafhygiene",
    "circadian",
    "melatonin",
    "oura ring",
    "erholung",
  ],
  "09": [
    "lebensproduktivitätssystem",
    "lps",
    "gewässer des lebens",
    "gewässer",
    "ozean",
    "reise",
    "inseln",
  ],
  10: [
    "das innere spiel",
    "inneres spiel",
    "innere arbeit",
    "mindset",
    "psychologie",
    "glaubenssätze",
    "perfektionismus",
    "burnout",
    "selbstoptimierung",
  ],
  11: [
    "gemeinschaft",
    "produktivitäts-gemeinschaft",
    "community",
    "freunde",
    "sozialer raum",
  ],
  12: [
    "lps party",
    "abschluss",
    "badges",
    "energie menü",
    "energiemenü",
    "vier säulen",
    "workbook",
  ],
};

// Zusätzliche, stärker gewichtete Phrasen/Signale je Modul sowie Negativsignale
const MODULE_EXTRA = {
  "08": {
    phrases: [
      "schlafoptimierung",
      "schlafqualität",
      "schlafhygiene",
      "circadian",
      "melatonin",
      "oura ring",
    ],
    titleHints: ["schlaf", "schlafqualität", "schlafoptimierung"],
    negatives: ["party", "abschluss"],
  },
  "09": {
    phrases: [
      "lebensproduktivitätssystem",
      "gewässer des lebens",
      "gewässer",
      "lps",
    ],
    titleHints: ["lebensproduktivitätssystem", "gewässer des lebens"],
    negatives: ["party", "abschluss", "gemeinschaft"],
  },
  10: {
    phrases: ["das innere spiel", "inneres spiel", "innere arbeit"],
    titleHints: ["das innere spiel", "inneres spiel"],
    negatives: ["party", "abschluss"],
  },
  12: {
    phrases: ["lps party", "abschlussreflexion", "abschluss"],
    titleHints: ["lps party", "abschluss"],
    negatives: ["inneres spiel"],
  },
};

// Scoring-Parameter
const MIN_SCORE = 6; // Unter dieser Schwelle wird kein Update geschrieben (Needs review)
const WEIGHTS = {
  phrase: 10, // starke Phrasen
  keyword: 1, // Basis-Keywords
  titleHint: 30, // Titel enthält klaren Modulsignalbegriff
  negative: -5, // Negativsignale (pro Treffer)
};

// Parse CLI args
function parseArgs() {
  const args = process.argv.slice(2);
  return {
    dryRun: args.includes("--dry-run"),
  };
}

// Read and parse MD file into lessons
function parseMD(mdPath) {
  const content = readFileSync(mdPath, "utf-8");
  const lessons = [];
  const lines = content.split("\n");

  let currentLesson = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // New lesson marker
    if (/^Lesson \d+ of/.test(line)) {
      if (currentLesson) {
        lessons.push(currentLesson);
      }

      // Extract title from marker if present (e.g., "Lesson 61 of 74**Title**")
      const titleMatch = line.match(/^Lesson \d+ of \d+\*\*(.+)\*\*$/);
      const markerTitle = titleMatch ? titleMatch[1].trim() : "";

      currentLesson = {
        marker: line.trim(),
        title: markerTitle,
        content: [],
      };
      continue;
    }

    if (currentLesson) {
      // Extract first heading as title if not already extracted from marker
      if (!currentLesson.title && /^#{1,2}\s/.test(line)) {
        currentLesson.title = line
          .replace(/^#{1,2}\s*\*?\*?/, "")
          .replace(/\*\*$/, "")
          .trim();
      }
      currentLesson.content.push(line);
    }
  }

  if (currentLesson) {
    lessons.push(currentLesson);
  }

  return lessons;
}

// Filter out non-substantive lessons (feedback/badges/RSVP only)
function isSubstantive(lesson) {
  const text = lesson.content.join("\n").toLowerCase();
  const title = lesson.title.toLowerCase();

  // Skip pure feedback/badge/RSVP lessons
  if (title.includes("feedback")) return false;
  if (title.includes("badge verfügbar") && text.length < 800) return false;
  if (title.includes("rsvp")) return false;

  // Must have substantive content (at least 800 chars)
  return text.replace(/\s/g, "").length > 800;
}

// Score lesson for module assignment
function scoreForModule(lesson, moduleNum) {
  const title = (lesson.title || "").toLowerCase();
  const text = (lesson.title + "\n" + lesson.content.join("\n")).toLowerCase();
  const keywords = MODULE_KEYWORDS[moduleNum] || [];
  const extra = MODULE_EXTRA[moduleNum] || {
    phrases: [],
    titleHints: [],
    negatives: [],
  };

  let score = 0;

  // Starke Phrasen
  for (const ph of extra.phrases) {
    if (!ph) continue;
    const regex = new RegExp(
      ph.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
      "gi",
    );
    const matches = text.match(regex);
    if (matches) score += matches.length * WEIGHTS.phrase;
  }

  // Titel-Hinweise
  for (const hint of extra.titleHints) {
    if (!hint) continue;
    if (title.includes(hint)) score += WEIGHTS.titleHint;
  }

  // Basis-Keywords
  for (const kw of keywords) {
    if (!kw) continue;
    const regex = new RegExp(
      kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
      "gi",
    );
    const matches = text.match(regex);
    if (matches) score += matches.length * WEIGHTS.keyword;
  }

  // Negativsignale
  for (const neg of extra.negatives) {
    if (!neg) continue;
    const regex = new RegExp(
      neg.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
      "gi",
    );
    const matches = text.match(regex);
    if (matches) score += matches.length * WEIGHTS.negative;
  }

  return score;
}

// Assign lessons to modules
function assignToModules(lessons) {
  const substantive = lessons.filter(isSubstantive);
  const remaining = new Set(substantive);
  const assignments = {};

  for (let m = 1; m <= 12; m++) {
    const moduleNum = String(m).padStart(2, "0");
    let bestLesson = null;
    let bestScore = 0;

    for (const lesson of remaining) {
      const score = scoreForModule(lesson, moduleNum);
      if (score > bestScore) {
        bestScore = score;
        bestLesson = lesson;
      }
    }

    if (bestLesson && bestScore > 0) {
      assignments[moduleNum] = {
        lesson: bestLesson,
        score: bestScore,
      };
      // Verhindere doppelte Wiederverwendung derselben Lesson in anderen Modulen
      remaining.delete(bestLesson);
    }
  }

  return assignments;
}

// Generate description from lesson content
function generateDescription(lesson) {
  let text = lesson.content.join("\n");

  // Remove excessive links sections
  text = text.replace(/\n\[.*?\]\(.*?\)\n/g, "\n");

  // Truncate at first "---" separator if present
  const sepIndex = text.indexOf("\n---\n");
  if (sepIndex > 0) {
    text = text.substring(0, sepIndex);
  }

  // Limit to ~1500-2000 chars (3-6 paragraphs)
  if (text.length > 2000) {
    const paragraphs = text.split("\n\n").filter((p) => p.trim().length > 0);
    let truncated = "";
    for (const p of paragraphs) {
      if ((truncated + p).length > 1800) break;
      truncated += p + "\n\n";
    }
    text = truncated.trim();
  }

  // Remove organizational/badge/RSVP sections
  text = text
    .split("\n")
    .filter((line) => {
      const lower = line.toLowerCase();
      if (lower.includes("badge verfügbar")) return false;
      if (lower.includes("rsvp")) return false;
      if (lower.includes("feedback") && line.length < 100) return false;
      return true;
    })
    .join("\n");

  return text.trim();
}

// Fetch images from Bunny Storage (optional)
async function fetchImages(modulePath) {
  const zone = process.env.BUNNY_STORAGE_ZONE;
  const key = process.env.BUNNY_STORAGE_ACCESS_KEY;

  if (!zone || !key) {
    return []; // No storage config, skip images
  }

  try {
    const url = `https://storage.bunnycdn.com/${zone}/${modulePath}/`;
    const res = await fetch(url, {
      headers: { AccessKey: key },
    });

    if (!res.ok) {
      console.warn(
        `  ⚠️  Image listing failed for ${modulePath}: ${res.status}`,
      );
      return [];
    }

    const items = await res.json();
    const imageExts = [".jpg", ".jpeg", ".png", ".webp"];
    const images = items
      .filter((item) => item.IsDirectory === false)
      .filter((item) =>
        imageExts.some((ext) => item.ObjectName.toLowerCase().endsWith(ext)),
      )
      .sort((a, b) => a.ObjectName.localeCompare(b.ObjectName))
      .slice(0, 6) // Max 6 images
      .map((item) => `${modulePath}/${item.ObjectName}`);

    return images;
  } catch (err) {
    console.warn(`  ⚠️  Image fetch error for ${modulePath}:`, err.message);
    return [];
  }
}

// Main function
async function main() {
  const { dryRun } = parseArgs();

  // Read inputs
  const mdPath = join(
    ROOT,
    "docs/PW_ Videobeschreibungen Circle Modul 1-12.md",
  );
  const coursesPath = join(ROOT, "content/videos/courses.json");
  const metaPath = join(ROOT, "content/videos/meta.json");

  console.log("📚 Reading source files...");
  const lessons = parseMD(mdPath);
  const courses = JSON.parse(readFileSync(coursesPath, "utf-8"));
  const meta = JSON.parse(readFileSync(metaPath, "utf-8"));

  console.log(`✅ Found ${lessons.length} lessons in MD`);
  console.log(
    `✅ Found ${Object.keys(courses.pw).length} PW modules in courses.json`,
  );

  // Assign lessons to modules
  console.log("\n🔍 Assigning lessons to modules...");
  const assignments = assignToModules(lessons);

  const report = [];
  report.push("# PW Import Report\n");
  report.push(`Generated: ${new Date().toISOString()}\n`);
  report.push(`Mode: ${dryRun ? "DRY RUN" : "APPLY"}\n\n`);

  const updates = {};

  for (const [moduleNum, assignment] of Object.entries(assignments)) {
    const modulePath = `modul-${moduleNum}`;
    const guid = courses.pw[modulePath];

    if (!guid) {
      console.log(`  ⚠️  No GUID mapping for ${modulePath}, skipping`);
      report.push(`## ${modulePath}\n\n⚠️ **No GUID mapping, skipped**\n\n`);
      continue;
    }

    // Mindestscore prüfen
    if (assignment.score < MIN_SCORE) {
      console.log(
        `  ⚠️  ${modulePath} → "${assignment.lesson.title}" (score: ${assignment.score}) below MIN_SCORE, needs review`,
      );
      report.push(`## ${modulePath} (GUID: ${guid})\n\n`);
      report.push(`**Title:** ${assignment.lesson.title}\n\n`);
      report.push(
        `**Score:** ${assignment.score} — ⚠️ Below MIN_SCORE (${MIN_SCORE}). Not applied.\n\n`,
      );
      report.push("---\n\n");
      continue;
    }

    console.log(
      `  ✓ ${modulePath} → "${assignment.lesson.title}" (score: ${assignment.score})`,
    );

    // Generate description
    const description = generateDescription(assignment.lesson);

    // Fetch images (only in description area, not cover)
    const images = await fetchImages(modulePath);
    const alt = images.map(
      (img) => `Modul ${moduleNum} – ${assignment.lesson.title}`,
    );

    // Build update
    updates[guid] = {
      ...meta[guid],
      description,
      images: images.length > 0 ? images : meta[guid]?.images || [],
      alt: images.length > 0 ? alt : meta[guid]?.alt || [],
    };

    // Report entry
    report.push(`## ${modulePath} (GUID: ${guid})\n\n`);
    report.push(`**Title:** ${assignment.lesson.title}\n\n`);
    report.push(`**Score:** ${assignment.score}\n\n`);
    report.push(
      `**Description (${description.length} chars):**\n\`\`\`\n${description.substring(0, 500)}${description.length > 500 ? "..." : ""}\n\`\`\`\n\n`,
    );
    report.push(
      `**Images:** ${images.length > 0 ? images.join(", ") : "None"}\n\n`,
    );
    report.push("---\n\n");
  }

  // Merge with existing meta (preserve non-PW entries)
  const finalMeta = { ...meta };
  for (const [guid, data] of Object.entries(updates)) {
    finalMeta[guid] = data;
  }

  // Write outputs
  if (dryRun) {
    const previewPath = join(ROOT, "content/videos/meta.preview.json");
    const reportPath = join(ROOT, "logs/pw-import-report.md");

    mkdirSync(join(ROOT, "logs"), { recursive: true });

    writeFileSync(previewPath, JSON.stringify(finalMeta, null, 2));
    writeFileSync(reportPath, report.join(""));

    console.log(`\n✅ DRY RUN complete`);
    console.log(`   Preview: ${previewPath}`);
    console.log(`   Report: ${reportPath}`);
  } else {
    writeFileSync(metaPath, JSON.stringify(finalMeta, null, 2));

    const reportPath = join(ROOT, "logs/pw-import-report.md");
    mkdirSync(join(ROOT, "logs"), { recursive: true });
    writeFileSync(reportPath, report.join(""));

    console.log(`\n✅ Import complete`);
    console.log(`   Updated: ${metaPath}`);
    console.log(`   Report: ${reportPath}`);
  }
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
