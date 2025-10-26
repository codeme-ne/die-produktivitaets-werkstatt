#!/usr/bin/env node
// Validate that all Markdown/CSV lesson contents use valid image placeholders
// and that matching [imageX] references exist in libs/imageRefs mapping.

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, basename } from 'path';

// Load the TypeScript mapping file by reading it as text and extracting MODULE_IMAGES.
// Simpler: we duplicate a minimal mapping extractor using eval in a sandboxed way.
// Safer: implement a tiny parser that looks for MODULE_IMAGES = { ... } and JSON.parse after quotes escaping.
// For reliability, we instead import the compiled JS is not available, so we manually reconstruct mapping here.

const BUNNY_CDN = 'https://pw-bunny.b-cdn.net';
const MODULE_IMAGES = {
  'modul-01': [
    'PW-M1-Produktivitäts-Formel.jpg',
    'PW-M1-Segelboot.jpeg',
    'PW-M1-Produktivitätssystem-Vision-Aktion.jpeg',
    'PW-M1-Lebensproduktivitätssystem-Kapitän.jpeg',
    'PW-M1-Lebensproduktivitätssystem-Raum.jpeg',
    'PW-M1-Segelboot.jpeg',
    'PW-M1-Produktivitätssystem-Vision-Aktion.jpeg',
  ],
  'modul-02': [
    'PW-M2-Fokusformel.jpeg',
    'PW-M2-Fokuslogbuch-Zitate.jpeg',
    'PW-M2-Planen-Übersichtsfolie.jpeg',
    'PW-M2-Organisieren-Übersichtsfolie.jpeg',
    'PW-M2-Reflektieren-Übersichtsfolie.jpeg',
    'PW-M2-Regenerieren-Übersichtsfolie.jpeg',
  ],
  'modul-03': [
    'PW-M3-Placeholder-01.jpeg','PW-M3-Placeholder-02.jpeg','PW-M3-Placeholder-03.jpeg','PW-M3-Placeholder-04.jpeg','PW-M3-Placeholder-05.jpeg','PW-M3-Placeholder-06.jpeg','PW-M3-Placeholder-07.jpeg','PW-M3-Placeholder-08.jpeg','PW-M3-Placeholder-09.jpeg','PW-M3-Placeholder-10.jpeg','PW-M3-Placeholder-11.jpeg','PW-M3-Placeholder-12.jpeg','PW-M3-Placeholder-13.jpeg','PW-M3-Placeholder-14.jpeg','PW-M3-Placeholder-15.jpeg',
  ],
  'modul-04': [
    'PW-M4-Abschaltritual.jpeg','PW-M4-Experiment.jpeg','PW-M4-Morgen-Manifest.jpeg',
    'PW-M4-Placeholder-04.jpeg','PW-M4-Placeholder-05.jpeg','PW-M4-Placeholder-06.jpeg','PW-M4-Placeholder-07.jpeg','PW-M4-Placeholder-08.jpeg','PW-M4-Placeholder-09.jpeg','PW-M4-Placeholder-10.jpeg','PW-M4-Placeholder-11.jpeg','PW-M4-Placeholder-12.jpeg','PW-M4-Placeholder-13.jpeg','PW-M4-Placeholder-14.jpeg','PW-M4-Placeholder-15.jpeg','PW-M4-Placeholder-16.jpeg','PW-M4-Placeholder-17.jpeg','PW-M4-Placeholder-18.jpeg',
  ],
  'modul-05': [
    'PW-M5-Visionboard-Lukas-2021.jpeg','PW-M5-Visionboard-Lukas-2025.jpeg',
    'PW-M5-Placeholder-03.jpeg','PW-M5-Placeholder-04.jpeg','PW-M5-Placeholder-05.jpeg','PW-M5-Placeholder-06.jpeg','PW-M5-Placeholder-07.jpeg','PW-M5-Placeholder-08.jpeg','PW-M5-Placeholder-09.jpeg','PW-M5-Placeholder-10.jpeg','PW-M5-Placeholder-11.jpeg','PW-M5-Placeholder-12.jpeg','PW-M5-Placeholder-13.jpeg','PW-M5-Placeholder-14.jpeg','PW-M5-Placeholder-15.jpeg','PW-M5-Placeholder-16.jpeg','PW-M5-Placeholder-17.jpeg','PW-M5-Placeholder-18.jpeg','PW-M5-Placeholder-19.jpeg','PW-M5-Placeholder-20.jpeg',
  ],
  'modul-06': [
    'PW-M6-Die-ideale-Woche-Lukas-selbstaendig.jpeg','PW-M6-Die-ideale-Woche-Lukas-angestellt.jpeg','PW-M6-Die-ideale-Woche-Beispiel-andere-Person.jpeg','PW-M6-Experiment.jpeg',
    'PW-M6-Placeholder-05.jpeg','PW-M6-Placeholder-06.jpeg','PW-M6-Placeholder-07.jpeg','PW-M6-Placeholder-08.jpeg','PW-M6-Placeholder-09.jpeg','PW-M6-Placeholder-10.jpeg','PW-M6-Placeholder-11.jpeg','PW-M6-Placeholder-12.jpeg','PW-M6-Placeholder-13.jpeg','PW-M6-Placeholder-14.jpeg','PW-M6-Placeholder-15.jpeg','PW-M6-Placeholder-16.jpeg','PW-M6-Placeholder-17.jpeg','PW-M6-Placeholder-18.jpeg','PW-M6-Placeholder-19.jpeg','PW-M6-Placeholder-20.jpeg','PW-M6-Placeholder-21.jpeg','PW-M6-Placeholder-22.jpeg','PW-M6-Placeholder-23.jpeg','PW-M6-Placeholder-24.jpeg',
  ],
  'modul-07': [
    'PW-M7-Bereiche-Projekte-Aufgaben.jpeg',
    'PW-M7-Coaching-Umsetzungssystem.jpeg',
    'PW-M7-ZPS-Methode-Beispiel-Accountability-App.jpeg',
    'PW-M7-ZPS-Methode-Beispiel-Atomschutzbunker.jpeg',
    'PW-M7-ZPS-Methode-Beispiel-Bachelorarbeit.jpeg',
    'PW-M7-ZPS-Methode-Beispiel-Balkondschungel.jpeg',
    'PW-M7-ZPS-Methode-Beispiel-Klopapiermuseum.jpeg',
  ],
  'modul-08': [
    'PW-M8-Destillieren-Text.png',
    'PW-M8-Projekte-Todoist.jpeg',
  ],
  'modul-09': [
    'PW-M9-Das-Selbst.png',
    'PW-M9-Produktivitätssystem-Aktion-Vision.png',
    'PW-M9-Produktivitaetssystem-Kapitaen.png',
    'PW-M9-Produktivitaetssystem-Raum.png',
    'PW-M9-joker-why-so-serious.png',
    'PW-M10-Workbook-Beschreibung-Navigationsbereich.jpg',
    'PW-M10-Workbook-Beschreibung-Navigationsbereich-Teil2.jpg',
  ],
  'modul-10': [
    'PW-M10-3-Burnout-Arten.png',
    'PW-M10-FAKE-Aktivitaeten.png',
    'PW-M10-Energie-Menu-Uebung.png',
    'PW-M10-Lukas-Energie-Menu.png',
  ],
  'modul-11': [
    'PW-M11-digitale-Inhaltsdiaet.png',
    'PW-M11-digitaler-Konsum.png',
  ],
  'modul-12': [
    'PW-M12-Lebensproduktivitaetssystem-Ueberblick.png',
    'PW-M12-Checkliste.png',
    'PW-M12-Workbook.png',
    'PW-M12-Testimonial-FAQ-Bonussession.png',
    'PW-M12-Landsiedel-Termine.png',
    'PW-M12-QR-Code-Katalyst.png',
  ],
};

const CONTENT_ROOT = join(process.cwd(), 'content', 'lessons');
const CSV_PATH = join(process.cwd(), 'docs', 'Google Sheets PW-Videobeschreibungen-2025-Transfer - Tabellenblatt1.csv');

const placeholderRe = /!\[]\[image(\d+)\]/g;

function findMarkdownFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...findMarkdownFiles(p));
    else if (name.endsWith('.md')) out.push(p);
  }
  return out;
}

function maxIndexUsed(text) {
  let m, max = 0;
  while ((m = placeholderRe.exec(text)) !== null) {
    const n = parseInt(m[1], 10);
    if (n > max) max = n;
  }
  return max;
}

function moduleFromPath(p) {
  const segs = p.split('/');
  const i = segs.lastIndexOf('lessons');
  return segs[i + 1]; // modul-XX
}

function parseCSV(content) {
  const rows = [];
  let row = [], cell = '', q = false;
  for (let i = 0; i < content.length; i++) {
    const c = content[i], n = content[i+1];
    if (c === '"') {
      if (q && n === '"') { cell += '"'; i++; }
      else q = !q;
    } else if (c === ',' && !q) {
      row.push(cell.trim()); cell='';
    } else if ((c === '\n' || c === '\r') && !q) {
      if (c === '\r' && n === '\n') i++;
      if (cell || row.length) { row.push(cell.trim()); rows.push(row); row=[]; cell=''; }
    } else { cell += c; }
  }
  if (cell || row.length) { row.push(cell.trim()); rows.push(row); }
  return rows;
}

function parseModuleFromFilename(fileName) {
  const m = /W(\d+)/i.exec(fileName);
  if (!m) return null;
  const num = String(m[1]).padStart(2, '0');
  return `modul-${num}`;
}

let errors = 0;

// 1) Validate Markdown overrides
for (const file of findMarkdownFiles(CONTENT_ROOT)) {
  const mod = moduleFromPath(file);
  const text = readFileSync(file, 'utf-8');
  const max = maxIndexUsed(text);
  if (max === 0) continue;
  const available = (MODULE_IMAGES[mod] || []).length;
  if (max > available) {
    console.error(`Invalid image placeholders in ${file}: uses image${max} but only ${available} available for ${mod}.`);
    errors++;
  }
}

// 2) Validate CSV descriptions (optional)
try {
  const csv = readFileSync(CSV_PATH, 'utf-8');
  const [header, ...rows] = parseCSV(csv);
  for (const r of rows) {
    const fileName = r[0] || '';
    const descr = r[3] || '';
    const mod = parseModuleFromFilename(fileName);
    if (!mod) continue;
    const max = maxIndexUsed(descr);
    if (max === 0) continue;
    const available = (MODULE_IMAGES[mod] || []).length;
    if (max > available) {
      console.error(`Invalid image placeholders in CSV row ${fileName}: uses image${max} but only ${available} available for ${mod}.`);
      errors++;
    }
  }
} catch {}

if (errors > 0) {
  console.error(`\nFound ${errors} image placeholder issue(s).`);
  process.exit(1);
} else {
  console.log('Image placeholders look good.');
}
