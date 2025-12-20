/**
 * Script zum Versenden von Einladungs-Emails an alle Teilnehmer
 * 
 * Usage:
 *   npx tsx scripts/send-invite-emails.ts --dry-run          # Nur anzeigen, nichts senden
 *   npx tsx scripts/send-invite-emails.ts --test-email=x@y   # Nur an Test-Email senden  
 *   npx tsx scripts/send-invite-emails.ts --send             # An ALLE senden (Vorsicht!)
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

// Load local env for scripts without adding a dotenv dependency
loadEnvFromFile(".env.local");

// ============ CONFIG ============
const DRY_RUN = process.argv.includes("--dry-run");
const SEND_ALL = process.argv.includes("--send");
const TEST_EMAIL_ARG = process.argv.find(arg => arg.startsWith("--test-email="));
const TEST_EMAIL = TEST_EMAIL_ARG ? TEST_EMAIL_ARG.split("=")[1] : null;
const EXPECT_ARG = process.argv.find(arg => arg.startsWith("--expect="));
const EXPECT_COUNT = EXPECT_ARG ? Number(EXPECT_ARG.split("=")[1]) : null;
const EXCLUDE_ARG = process.argv.find((arg) => arg.startsWith("--exclude="));
const EXCLUDED_EMAILS = new Set(
  (EXCLUDE_ARG ? EXCLUDE_ARG.split("=")[1] : "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean),
);

// Ignore localhost URLs for invite emails – always use production URL
const envBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || "";
const BASE_URL = envBaseUrl.includes("localhost")
  ? "https://zangerlcoachingdynamics.com"
  : (envBaseUrl || "https://zangerlcoachingdynamics.com");
const DELAY_BETWEEN_EMAILS_MS = 1000; // 1 Sekunde zwischen Mails

// ============ HELPERS ============
async function listAllParticipants() {
  const { listActiveParticipants } = await import("../libs/participants");
  return listActiveParticipants();
}

async function sendInviteEmail(toEmail: string) {
  const { sendEmail } = await import("../libs/resend");
  const { inviteEmail, inviteEmailSubject } = await import("../emails/invite");
  const { default: config } = await import("../config");

  const loginUrl = `${BASE_URL}/login`;

  const data = await sendEmail({
    to: toEmail,
    subject: inviteEmailSubject,
    text:
      "Dein Zugang zur Produktivitäts-Werkstatt ist aktiv.\n\n" +
      `Login: ${loginUrl}\n\n` +
      "So loggst du dich ein:\n" +
      "1) Login-Seite öffnen\n" +
      `2) E-Mail-Adresse eingeben: ${toEmail}\n` +
      "3) Den Login-Link aus der E-Mail anklicken\n\n" +
      "Wenn der Link abläuft, kannst du ihn jederzeit neu anfordern.",
    html: inviteEmail(loginUrl, toEmail),
    replyTo: config.resend.supportEmail || undefined,
  });

  return data;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============ MAIN ============
async function main() {
  console.log("\n========================================");
  console.log("  EINLADUNGS-EMAIL SCRIPT");
  console.log("========================================\n");

  // Check env vars
  if (!process.env.RESEND_API_KEY) {
    console.error("❌ RESEND_API_KEY nicht gefunden in .env.local");
    process.exit(1);
  }

  // Mode info
  if (DRY_RUN) {
    console.log("🔍 MODUS: DRY-RUN\n");
  } else if (TEST_EMAIL) {
    console.log(`📧 MODUS: TEST (nur an ${TEST_EMAIL} senden)\n`);
  } else if (SEND_ALL) {
    console.log("🚀 MODUS: LIVE (an ALLE Teilnehmer senden!)\n");
  } else {
    console.log("ℹ️  Kein Modus angegeben. Nutze:");
    console.log("   --dry-run       Nur Teilnehmer anzeigen");
    console.log("   --test-email=X  Nur an X senden");
    console.log("   --send          An alle senden");
    console.log("   --expect=N      Optional: Abbruch, wenn nicht genau N Teilnehmer gefunden werden");
    console.log("   --exclude=a@b,c@d  Optional: bestimmte Empfänger überspringen");
    process.exit(0);
  }

  const needsDb = DRY_RUN || SEND_ALL;
  if (needsDb && !process.env.POSTGRES_URL && !process.env.DATABASE_URL) {
    console.error("❌ Keine Datenbank-URL gefunden! Setze POSTGRES_URL oder DATABASE_URL in .env.local");
    process.exit(1);
  }

  // Fetch participants (only if needed)
  let participants: Array<{ email: string; productType?: string; createdAt?: string }> = [];
  if (needsDb) {
    console.log("📥 Lade Teilnehmer aus Neon DB...\n");
    participants = await listAllParticipants();

    if (EXPECT_COUNT !== null && Number.isFinite(EXPECT_COUNT) && participants.length !== EXPECT_COUNT) {
      console.error(
        `❌ Erwartet: ${EXPECT_COUNT} Teilnehmer, gefunden: ${participants.length}. Abbruch (Sicherheits-Check).`,
      );
      process.exit(1);
    }

    console.log(`📋 ${participants.length} aktive Teilnehmer gefunden:\n`);
    console.log("   Nr.  | E-Mail");
    console.log("   -----|-------------------------------------");
    participants.forEach((p, i) => {
      const email = String(p.email);
      const excluded = EXCLUDED_EMAILS.has(email.toLowerCase()) ? " (excluded)" : "";
      console.log(`   ${String(i + 1).padStart(3)}  | ${email.padEnd(35)}${excluded}`);
    });
    console.log("");

    if (EXCLUDED_EMAILS.size > 0) {
      console.log(`ℹ️  Excluded: ${Array.from(EXCLUDED_EMAILS).join(", ")}\n`);
    }
  }

  // DRY RUN - just show (or optionally send test email after listing)
  if (DRY_RUN && !TEST_EMAIL) {
    console.log("✅ Dry-Run beendet. Keine E-Mails gesendet.");
    process.exit(0);
  }

  // TEST MODE - only send to test email
  if (TEST_EMAIL) {
    const label = DRY_RUN ? "DRY-RUN + TEST" : "TEST";
    console.log(`\n📧 MODUS: ${label} → sende an: ${TEST_EMAIL}`);
    
    try {
      const result = await sendInviteEmail(TEST_EMAIL);
      console.log(`   ✓ E-Mail gesendet! ID: ${result?.id}`);
      console.log(`\n🔗 Login-Link (in der Mail): ${BASE_URL}/login`);
      console.log("\n✅ Test erfolgreich! Prüfe dein Postfach.");
    } catch (error) {
      console.error(`   ❌ Fehler:`, error);
    }
    
    process.exit(0);
  }

  // SEND ALL - dangerous!
  if (SEND_ALL) {
    console.log("\n⚠️  ACHTUNG: Du bist dabei, E-Mails an ALLE zu senden!");
    console.log("   Drücke CTRL+C zum Abbrechen (5 Sekunden)...\n");
    
    await sleep(5000);
    
    console.log("🚀 Starte Versand...\n");
    
    let sent = 0;
    let failed = 0;
    
    for (const participant of participants) {
      try {
        console.log(`📧 [${sent + failed + 1}/${participants.length}] ${participant.email}...`);

        if (EXCLUDED_EMAILS.has(String(participant.email).toLowerCase())) {
          console.log("   ↷ Übersprungen (excluded)");
          continue;
        }

        await sendInviteEmail(participant.email);
        
        console.log(`   ✓ Gesendet!`);
        sent++;
        
        // Delay between emails
        if (sent < participants.length) {
          await sleep(DELAY_BETWEEN_EMAILS_MS);
        }
      } catch (error) {
        console.error(`   ❌ Fehler:`, error);
        failed++;
      }
    }
    
    console.log("\n========================================");
    console.log(`  ✅ ${sent} E-Mails erfolgreich gesendet`);
    if (failed > 0) {
      console.log(`  ❌ ${failed} fehlgeschlagen`);
    }
    console.log("========================================\n");
  }
}

main().catch(console.error);
