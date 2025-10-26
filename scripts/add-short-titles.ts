#!/usr/bin/env tsx
/**
 * Script to add shortened titles (Kurztitel) to the CSV file
 * This adds a new column between Beschreibung and Links
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Mapping of filenames to shortened titles
const shortTitles: Record<string, string> = {
  // Woche 1: Willkommen (7 Lektionen)
  'PW_W01_L01_Willkommen': '👋 Willkommen in der PW',
  'PW_W01_L02_Mindset': '🧠 Das Tüftler Mindset',
  'PW_W01_L03_Katalyst': '📝 Der Produktivitäts-Katalyst',
  'PW_W01_L04_LPS_Gewaesser': '🌊 LPS - Die Gewässer des Lebens',
  'PW_W01_L05_LPS_Ueberblick': '📊 LPS im Überblick',
  'PW_W01_L06_Experiment_W1': '🧪 Experiment W1: Der Katalyst',
  'PW_W01_L07_Feedback': '✅ LPS Feedback [BADGE]',

  // Woche 2: Fokus (7 Lektionen)
  'PW_W02_L01_Reflexion': '🤓 Reflexion - LPS',
  'PW_W02_L02_Fokus_Tipps': '💡 Fokus-Tipps',
  'PW_W02_L03_Ausrichten_Organisieren': '🧭 Ausrichten & Organisieren',
  'PW_W02_L04_Regenerieren_Reflektieren': '🧘 Regenerieren & Reflektieren',
  'PW_W02_L05_Fokus_Logbuch': '📔 Das Fokus-Logbuch',
  'PW_W02_L06_Experiment_W2': '🧪 Experiment W2: Fokus-Logbuch',
  'PW_W02_L07_Feedback': '⌛ Fokusstunden Feedback',

  // Woche 3: Lebenskompass (9 Lektionen)
  'PW_W03_L01_Reflexion': '⏳ Reflexion - Fokussierte Stunden',
  'PW_W03_L02_Lebenskompass_Ueberblick': '🧭 Lebenskompass Überblick',
  'PW_W03_L03_Finde_Deinen_Weg': '🛣️ Finde Deinen Weg',
  'PW_W03_L04_Grabrede': '🪦 Deine Grabrede',
  'PW_W03_L05_Loeffelliste': '🥄 Deine Löffelliste',
  'PW_W03_L06_Deine_Mission': '⭐ Deine Mission',
  'PW_W03_L07_Deine_Definition_von_Erfolg': '🏆 Definition von Erfolg',
  'PW_W03_L08_Experiment_W3': '🧪 Experiment W3: Lebenskompass',
  'PW_W03_L09_Feedback': '🧭 Lebenskompass Feedback',

  // Woche 4: Produktive Tage (8 Lektionen)
  'PW_W04_L01_Reflexion': '🧭 Reflexion - Lebenskompass',
  'PW_W04_L02_Protokoll_Tag': '📆 Protokoll produktiver Tag',
  'PW_W04_L03_Idealer_Dienstag': '💫 Dein idealer Dienstag',
  'PW_W04_L04_Morgen_Manifest': '☀️ Dein Morgen-Manifest',
  'PW_W04_L05_Fokuszeit': '⏳ Fokuszeit',
  'PW_W04_L06_Abendliches_Abschalten': '🌙 Abendliches Abschalten',
  'PW_W04_L07_Experiment_W4': '🧪 Experiment W4: Morgen-Ritual',
  'PW_W04_L08_Feedback': '🌞 Produktive Tage [BADGE]',

  // Woche 5: Zukunftsskizze (6 Lektionen)
  'PW_W05_L01_Reflexion': '🌞 Reflexion - Produktive Tage',
  'PW_W05_L02_Zukunftsskizze_Ueberblick': '🎨 Zukunftsskizze Überblick',
  'PW_W05_L03_Odyssee_Plan': '🛶 Dein Odyssee Plan',
  'PW_W05_L04_Vision_Board': '🖼️ Dein Vision Board',
  'PW_W05_L05_3_Jahres_Traum': '🏰 Dein 3-Jahres-Traum',
  'PW_W05_L06_Feedback': '🎨 Zukunftsskizze Feedback',

  // Woche 6: Ausgeglichene Wochen (6 Lektionen)
  'PW_W06_L01_Reflexion': '🎨 Reflexion - Zukunftsskizze',
  'PW_W06_L02_Wochenplan': '⚖️ Ausgeglichener Wochenplan',
  'PW_W06_L03_Planungsritual': '7️⃣ Wöchentliches Planungsritual',
  'PW_W06_L04_Ideale_Woche': '📅 Die ideale Woche',
  'PW_W06_L05_Experiment_W6': '🧪 Experiment W6: Ideale Woche',
  'PW_W06_L06_Feedback': '⚖️ Ausgeglichene Wochen [BADGE]',

  // Woche 7: Quartals-Missionen (7 Lektionen)
  'PW_W07_L01_Vorwort': '🔴 Vorwort Quartals-Missionen',
  'PW_W07_L02_Quartals_Missionen_Ueberblick': '🚀 Quartals-Missionen Überblick',
  'PW_W07_L03_Bereiche_Projekte_Aufgaben': '📁 Bereiche, Projekte, Aufgaben',
  'PW_W07_L04_Haupt_Neben_Missionen': '🗺️ Haupt- & Neben-Missionen',
  'PW_W07_L05_ZPS_Methode': '🌐 Die ZPS-Methode',
  'PW_W07_L06_Experiment_W7': '🧪 Experiment W7: Quartals-Missionen',
  'PW_W07_L07_Feedback': '🚀 Quartals-Missionen [BADGE]',

  // Woche 8: Organisieren (1 Lektion)
  'PW_W08_L01_Organisieren_Workshop': '📁 Organisieren Workshop [BADGE]',

  // Woche 9: Das innere Spiel (10 Lektionen)
  'PW_W09_L01_Reflexion': '📁 Reflexion - Organisieren',
  'PW_W09_L02_Das_Selbst': '🧘 Das Selbst (Hirn, Herz, Körper)',
  'PW_W09_L03_Hirn_Spiel': '🧠 Hirn: Leben als Spiel',
  'PW_W09_L04_Hirn_Motivationsspektrum': '🪷 Hirn: Motivationsspektrum',
  'PW_W09_L05_Anti_Prokrastination': '🫀 Herz: Anti-Prokrastination',
  'PW_W09_L06_Schlaf_Verbesserung': '💤 Körper: Besserer Schlaf',
  'PW_W09_L07_Gesundheit_Verbesserung': '🍎 Körper: Bessere Gesundheit',
  'PW_W09_L08_Alter_Ego_Effekt': '👓 Der Alter-Ego-Effekt',
  'PW_W09_L09_Experiment_W9': '🧪 Experiment W9: Anti-Prokrastination',
  'PW_W09_L10_Feedback': '🎲 Inneres Spiel Feedback',

  // Woche 10: Regenerieren (6 Lektionen)
  'PW_W10_L01_Reflexion': '🎲 Reflexion - Inneres Spiel',
  'PW_W10_L02_Drei_Arten_Burnout': '🛡️ Drei Arten von Burnout',
  'PW_W10_L03_Ueberanstrengung_Burnout': '🔥 Überanstrengungs-Burnout',
  'PW_W10_L04_FAKE_Aktivitaeten': '🧩 F.A.K.E. Aktivitäten',
  'PW_W10_L05_Energie_Menue': '🌈 Dein Energie Menü',
  'PW_W10_L06_Feedback': '🌿 Regenerieren [BADGE]',

  // Woche 11: Raum (6 Lektionen)
  'PW_W11_L01_Reflexion': '🌿 Reflexion - Regenerieren',
  'PW_W11_L02_Physischer_Raum': '🧹 Optimierung physischer Raum',
  'PW_W11_L03_Virtueller_Raum': '🖥️ Optimierung virtueller Raum',
  'PW_W11_L04_Produktivitaets_Gemeinschaft': '👨‍👩‍👧‍👦 Produktivitäts-Gemeinschaft',
  'PW_W11_L05_CoWorking_Session': '🧙 Einladung Co-Working Session',
  'PW_W11_L06_Feedback': '🏠 Raum Feedback [BADGE]',

  // Woche 12: Abschluss (2 Lektionen)
  'PW_W12_L01_LPS_Party': '🥳 LPS Party [BADGE]',
  'PW_W12_L02_Feedback': '🥳 LPS Party Feedback [BADGE]',
};

/**
 * Parse CSV properly handling quotes and commas
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i++; // Skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}

/**
 * Build CSV line from array, quoting fields that need it
 */
function buildCSVLine(fields: string[]): string {
  return fields.map(field => {
    // Quote if contains comma, quote, or newline
    if (field.includes(',') || field.includes('"') || field.includes('\n')) {
      // Escape quotes by doubling them
      const escaped = field.replace(/"/g, '""');
      return `"${escaped}"`;
    }
    return field;
  }).join(',');
}

function main() {
  const csvPath = join(process.cwd(), 'docs', 'Google Sheets PW-Videobeschreibungen-2025-Transfer - Tabellenblatt1.csv');

  console.log('Reading CSV file...');
  const content = readFileSync(csvPath, 'utf-8');
  const lines = content.split('\n');

  console.log(`Processing ${lines.length} lines...`);

  const updatedLines = lines.map((line, index) => {
    if (!line.trim()) return line; // Preserve empty lines

    const fields = parseCSVLine(line);

    if (index === 0) {
      // Header row: insert "Kurztitel" at index 4
      fields.splice(4, 0, 'Kurztitel');
      return buildCSVLine(fields);
    }

    if (fields.length < 4) {
      // Incomplete line
      fields.splice(4, 0, '');
      return buildCSVLine(fields);
    }

    // Data row
    const filename = fields[0];
    const shortTitle = shortTitles[filename] || '';

    // Insert shortTitle at index 4 (after Beschreibung)
    fields.splice(4, 0, shortTitle);

    if (shortTitle) {
      console.log(`  ${filename} -> ${shortTitle}`);
    }

    return buildCSVLine(fields);
  });

  console.log('Writing updated CSV...');
  writeFileSync(csvPath, updatedLines.join('\n'), 'utf-8');

  console.log('✅ Done! CSV updated with Kurztitel column.');

  const addedCount = Object.keys(shortTitles).length;
  console.log(`\n📊 Summary: ${addedCount} short titles added`);
}

main();
