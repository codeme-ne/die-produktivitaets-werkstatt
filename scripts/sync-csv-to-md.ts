/**
 * Sync CSV to MD: Generate missing lesson MD files from CSV data
 * Only creates missing files - never overwrites existing MD files
 */

import { readPwCsv } from "../libs/pwCsv";
import { moduleSlug, slugifyTitle, parseModuleLesson } from "../libs/slugs";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";

/**
 * Extract emoji from title (first non-word character)
 */
function extractEmoji(title: string): string | null {
  const match = title.match(/^([^\w\s]+)/);
  return match ? match[1].trim() : null;
}

/**
 * Clean CSV description: remove escape sequences, normalize spacing
 */
function cleanDescription(desc: string): string {
  return desc
    .replace(/\\"/g, '"') // Unescape quotes
    .replace(/\\n/g, "\n") // Convert literal \n to newlines
    .trim();
}

/**
 * Generate MD content from CSV row
 */
function generateMdContent(title: string, description: string): string {
  const emoji = extractEmoji(title) || "📝";
  const cleanTitle = title.replace(/^[^\w\s]+/, "").trim();
  const cleanDesc = cleanDescription(description);

  return `# ${emoji} ${cleanTitle}\n\n${cleanDesc}\n`;
}

/**
 * Main sync function
 */
async function syncCsvToMd() {
  console.log("📋 Reading CSV data...");
  const rows = readPwCsv();
  console.log(`   Found ${rows.length} lessons in CSV\n`);

  let created = 0;
  let skipped = 0;
  let errors = 0;

  const moduleStats = new Map<string, { total: number; exists: number }>();

  for (const row of rows) {
    const parsed = parseModuleLesson(row.Dateiname);
    if (!parsed.module) {
      console.warn(`   ⚠️  Skipping invalid filename: ${row.Dateiname}`);
      errors++;
      continue;
    }

    const modSlug = moduleSlug(parsed.module);
    const lessonSlug = slugifyTitle(row.Titel) || `lektion-${parsed.lesson || 1}`;
    const mdDir = join(process.cwd(), "content", "lessons", modSlug);
    const mdPath = join(mdDir, `${lessonSlug}.md`);

    // Track stats
    if (!moduleStats.has(modSlug)) {
      moduleStats.set(modSlug, { total: 0, exists: 0 });
    }
    const stats = moduleStats.get(modSlug)!;
    stats.total++;

    // Check if file exists
    if (existsSync(mdPath)) {
      stats.exists++;
      skipped++;
      continue;
    }

    // Create directory if needed
    if (!existsSync(mdDir)) {
      mkdirSync(mdDir, { recursive: true });
      console.log(`   📁 Created directory: ${modSlug}/`);
    }

    // Generate and write MD file
    try {
      const content = generateMdContent(row.Titel, row.Beschreibung);
      writeFileSync(mdPath, content, "utf-8");
      console.log(`   ✅ Created: ${modSlug}/${lessonSlug}.md`);
      created++;
      stats.exists++;
    } catch (err) {
      console.error(`   ❌ Error creating ${mdPath}:`, err);
      errors++;
    }
  }

  // Print summary
  console.log("\n📊 Summary:");
  console.log(`   ✅ Created: ${created} files`);
  console.log(`   ⏭️  Skipped: ${skipped} files (already exist)`);
  if (errors > 0) {
    console.log(`   ❌ Errors: ${errors} files`);
  }

  console.log("\n📁 Module Overview:");
  const sortedModules = Array.from(moduleStats.entries()).sort((a, b) =>
    a[0].localeCompare(b[0]),
  );
  for (const [mod, stats] of sortedModules) {
    const status = stats.exists === stats.total ? "✓" : "⚠";
    console.log(`   ${status} ${mod}: ${stats.exists}/${stats.total} MD files`);
  }

  if (created > 0) {
    console.log("\n💡 Next steps:");
    console.log("   1. Review generated files in content/lessons/");
    console.log("   2. Run: npm run validate-lessons (when available)");
    console.log("   3. Commit changes if all looks good");
  }
}

// Run
syncCsvToMd().catch((err) => {
  console.error("❌ Fatal error:", err);
  process.exit(1);
});
