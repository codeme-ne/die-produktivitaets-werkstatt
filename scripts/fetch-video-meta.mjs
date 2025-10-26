#!/usr/bin/env node
// Fetch video durations from Bunny Stream API and write to content/video-meta.json
// Requires env: BUNNY_VIDEO_API_KEY

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const API_KEY = process.env.BUNNY_VIDEO_API_KEY;
if (!API_KEY) {
  console.error('Missing env BUNNY_VIDEO_API_KEY');
  process.exit(1);
}

const CSV_PATH = join(process.cwd(), 'docs', 'Google Sheets PW-Videobeschreibungen-2025-Transfer - Tabellenblatt1.csv');
const META_PATH = join(process.cwd(), 'content', 'video-meta.json');

function parseCSV(content) {
  const rows = [];
  let row = [], cell = '', q = false;
  for (let i = 0; i < content.length; i++) {
    const c = content[i], n = content[i+1];
    if (c === '"') { if (q && n === '"') { cell += '"'; i++; } else { q = !q; } }
    else if (c === ',' && !q) { row.push(cell.trim()); cell=''; }
    else if ((c === '\n' || c === '\r') && !q) {
      if (c === '\r' && n === '\n') i++;
      if (cell || row.length) { row.push(cell.trim()); rows.push(row); row=[]; cell=''; }
    } else { cell += c; }
  }
  if (cell || row.length) { row.push(cell.trim()); rows.push(row); }
  return rows;
}

function parsePlayUrl(url) {
  const m = /\/play\/([^/]+)\/([^/?]+)/.exec(url || '');
  if (!m) return null;
  return { libraryId: m[1], guid: m[2] };
}

async function fetchMeta(libraryId, guid) {
  const endpoint = `https://video.bunnycdn.com/library/${libraryId}/videos/${guid}`;
  const res = await fetch(endpoint, { headers: { AccessKey: API_KEY } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  // Bunny returns length in seconds under 'length' for videos
  const durationSec = json.length ?? json.duration ?? json.videoLength ?? null;
  return { durationSec, title: json.title };
}

async function main() {
  const csv = readFileSync(CSV_PATH, 'utf-8');
  const [header, ...rows] = parseCSV(csv);
  const idxVideos = 2; // Dateiname, Titel, Videos, Beschreibung, ...

  const byGuid = new Map();
  for (const r of rows) {
    const videoUrl = r[idxVideos];
    const parsed = parsePlayUrl(videoUrl);
    if (!parsed) continue;
    byGuid.set(parsed.guid, parsed.libraryId);
  }

  const existing = existsSync(META_PATH) ? JSON.parse(readFileSync(META_PATH, 'utf-8') || '{}') : {};
  const out = { ...existing };

  let updated = 0;
  for (const [guid, libraryId] of byGuid.entries()) {
    try {
      const meta = await fetchMeta(libraryId, guid);
      if (!meta.durationSec) continue;
      out[guid] = { durationSec: Math.round(meta.durationSec), title: meta.title, fetchedAt: new Date().toISOString() };
      updated++;
    } catch (e) {
      console.error(`Failed to fetch ${guid}:`, e.message);
    }
  }

  writeFileSync(META_PATH, JSON.stringify(out, null, 2), 'utf-8');
  console.log(`Updated ${updated} video meta entrie(s). Written to content/video-meta.json`);
}

main().catch((e) => { console.error(e); process.exit(1); });

