/**
 * Füge neue Teilnehmer zur Neon DB hinzu
 */
import { existsSync, readFileSync } from "fs";

function loadEnvFromFile(path: string) {
  if (!existsSync(path)) return;
  const content = readFileSync(path, "utf-8");
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const idx = line.indexOf("=");
    if (idx <= 0) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFromFile(".env.local");

const EMAILS_TO_ADD = [
  "s.zangerl@gmx.at",
  "herbert.zangerl@gmx.at", 
  "anna-theresa.schmitz@web.de"
];

async function main() {
  const { neon } = await import("@neondatabase/serverless");
  const sql = neon(process.env.POSTGRES_URL!);

  console.log("📥 Füge Teilnehmer hinzu...\n");

  for (const email of EMAILS_TO_ADD) {
    await sql`
      INSERT INTO participants (email, product_type, status)
      VALUES (${email}, 'pw-selfhosted', 'active')
      ON CONFLICT (email) DO UPDATE SET status = 'active'
    `;
    console.log(`   ✓ ${email}`);
  }

  console.log("\n✅ Fertig! Alle 3 Teilnehmer hinzugefügt.");
}

main().catch(console.error);
