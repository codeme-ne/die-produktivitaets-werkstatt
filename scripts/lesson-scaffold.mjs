#!/usr/bin/env node
// Scaffold a new lesson Markdown file under content/lessons/modul-XX/<slug>.md
// Usage:
//   npm run lesson:new -- 01 "Mein Lektionstitel"
//   npm run lesson:new -- 07 "Kurztitel" --slug optional-slug

import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function usage() {
  console.log('Usage: npm run lesson:new -- <mod> "<title>" [--slug <slug>]');
  process.exit(1);
}

const args = process.argv.slice(2);
if (args.length < 2) usage();

const modRaw = args[0];
const title = args[1];
let customSlug = null;
for (let i = 2; i < args.length; i++) {
  if (args[i] === '--slug') customSlug = args[++i];
}

const mod = String(modRaw).padStart(2, '0');
const moduleSlug = `modul-${mod}`;
const lessonSlug = customSlug || slugify(title);

const dir = join(process.cwd(), 'content', 'lessons', moduleSlug);
const file = join(dir, `${lessonSlug}.md`);

mkdirSync(dir, { recursive: true });
if (existsSync(file)) {
  console.error(`File already exists: ${file}`);
  process.exit(1);
}

const body = `# ${title}\n\n` +
`<!-- Kurzeinführung (2-3 Sätze, Nutzen) -->\n\n` +
`## Das lernst du\n\n- Punkt 1\n- Punkt 2\n- Punkt 3\n\n` +
`## Schritte\n\n1. Erster Schritt\n2. Zweiter Schritt\n3. Dritter Schritt\n\n` +
`## Reflexion\n\n- Frage 1\n- Frage 2\n\n` +
`<!-- Optionales Bild im Text: ![][image1]  -->\n`;

writeFileSync(file, body, 'utf-8');
console.log(`Created: ${file}`);
console.log('Hinweis: Bild-Platzhalter ![][imageX] verwenden; Referenzen werden automatisch zugeordnet.');

