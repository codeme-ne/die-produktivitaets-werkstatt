#!/usr/bin/env node
// Fix common formatting issues in lesson Markdown files.
// Usage:
//   npm run content:fix            # all lessons
//   npm run content:fix -- <file>  # single file

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

function listFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...listFiles(p));
    else if (name.endsWith('.md')) out.push(p);
  }
  return out;
}

function fixContent(s) {
  let t = s;
  // 1) Entferne Startzeile "Lesson X of Y"
  t = t.replace(/^Lesson\s+\d+\s+of\s+\d+\s*\n+/i, '');
  // 2) Entferne reine Trennstriche am Ende
  t = t.replace(/\n+---\n*(?:---\n*)*$/m, '\n');
  // 3) Entschärfe Escapes in Überschriften und Zahlen
  t = t.replace(/^((?:#+)\s.*)\\!$/gm, '$1!');
  t = t.replace(/(\d+)\\\./g, '$1.');
  // 4) Bulletpoints: "\\- " → "- "
  t = t.replace(/^\\-\s/gm, '- ');
  // 5) Doppelte Leerzeilen reduzieren (max. 2)
  t = t.replace(/\n{3,}/g, '\n\n');
  return t;
}

const args = process.argv.slice(2);
const files = args.length ? args : listFiles(join(process.cwd(), 'content', 'lessons'));

let changed = 0;
for (const f of files) {
  const before = readFileSync(f, 'utf-8');
  const after = fixContent(before);
  if (after !== before) {
    writeFileSync(f, after, 'utf-8');
    changed++;
    console.log('Fixed:', f);
  }
}
console.log(`Done. ${changed} file(s) updated.`);

