#!/usr/bin/env node
// Generate a video meta JSON skeleton from Bunny Stream list
// Usage:
//   node scripts/generate-video-meta.mjs \
//     --base https://pw-bunny.b-cdn.net \
//     --output content/videos/meta.json
//
// Requires env:
//   BUNNY_STREAM_LIBRARY_ID, BUNNY_STREAM_ACCESS_KEY

const DEFAULT_DIRS = Array.from(
  { length: 12 },
  (_, i) => `modul-${String(i + 1).padStart(2, "0")}`,
);

function parseArgs() {
  const raw = process.argv.slice(2);
  const args = {};
  for (let i = 0; i < raw.length; i++) {
    const a = raw[i];
    if (a.startsWith("--")) {
      const k = a.slice(2);
      const v = raw[i + 1] && !raw[i + 1].startsWith("--") ? raw[++i] : "1";
      args[k] = v;
    }
  }
  return args;
}

async function main() {
  const args = parseArgs();
  const LIB = process.env.BUNNY_STREAM_LIBRARY_ID;
  const KEY = process.env.BUNNY_STREAM_ACCESS_KEY;
  const BASE = args.base || process.env.NEXT_PUBLIC_ASSETS_BASE_URL || "";
  const OUTPUT = args.output || "content/videos/meta.json";
  if (!LIB || !KEY) {
    console.error(
      "Missing env BUNNY_STREAM_LIBRARY_ID or BUNNY_STREAM_ACCESS_KEY",
    );
    process.exit(1);
  }

  const res = await fetch(
    `https://video.bunnycdn.com/library/${LIB}/videos?page=1&perPage=100`,
    {
      headers: { Accept: "application/json", AccessKey: KEY },
    },
  );
  if (!res.ok) {
    console.error("List failed:", res.status, await res.text());
    process.exit(1);
  }
  const json = await res.json();
  const items = json.items || [];

  // Build mapping by heuristics: title contains modul number, else sequential
  const used = new Set();
  function pickDirFromTitle(title) {
    if (!title) return null;
    const t = String(title).toLowerCase();
    const m = t.match(/modul[\s\-]?([0-9]{1,2})/i);
    if (m) {
      const n = parseInt(m[1], 10);
      if (n >= 1 && n <= 12) {
        const dir = `modul-${String(n).padStart(2, "0")}`;
        if (!used.has(dir)) return dir;
      }
    }
    if (t.includes("linkedin")) {
      const dir = "Linkedin-Posts-Landing";
      if (!used.has(dir)) return dir;
    }
    return null;
  }

  function nextAvailableDir() {
    for (const d of ["Linkedin-Posts-Landing", ...DEFAULT_DIRS]) {
      if (!used.has(d)) return d;
    }
    return null;
  }

  const out = {};
  for (const v of items) {
    const guid = v.guid;
    const title = v.title || "";
    let dir = pickDirFromTitle(title);
    if (!dir) dir = nextAvailableDir();
    if (!dir) continue;
    used.add(dir);
    out[guid] = {
      guid,
      description: "",
      images: [`${dir}/cover.jpg`],
      alt: [`${title || dir} Cover`],
      links: [],
    };
  }

  // Write file
  const fs = await import("fs");
  fs.writeFileSync(OUTPUT, JSON.stringify(out, null, 2));
  console.log("Wrote meta JSON to", OUTPUT);
  if (!BASE) {
    console.log(
      "Tip: Set NEXT_PUBLIC_ASSETS_BASE_URL to your CDN base, e.g., https://pw-bunny.b-cdn.net",
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
