#!/usr/bin/env node
// Minimal CLI to create a Stream video and upload a file to Bunny.net
// Usage: node scripts/bunny-upload.mjs \
//   --title "My Video" --file ./path/to/video.mp4

import fs from "fs";

const args = Object.fromEntries(
  process.argv
    .slice(2)
    .map((a, i, arr) => (a.startsWith("--") ? [a.slice(2), arr[i + 1]] : []))
    .filter(Boolean),
);

const LIBRARY_ID = process.env.BUNNY_STREAM_LIBRARY_ID;
const ACCESS_KEY = process.env.BUNNY_STREAM_ACCESS_KEY;
if (!LIBRARY_ID || !ACCESS_KEY) {
  console.error(
    "Missing env BUNNY_STREAM_LIBRARY_ID or BUNNY_STREAM_ACCESS_KEY",
  );
  process.exit(1);
}

const title = args.title || args.t;
const file = args.file || args.f;
if (!title || !file) {
  console.error(
    "Usage: node scripts/bunny-upload.mjs --title 'My Video' --file ./video.mp4",
  );
  process.exit(1);
}

const BASE = "https://video.bunnycdn.com";

async function createVideo() {
  const res = await fetch(`${BASE}/library/${LIBRARY_ID}/videos`, {
    method: "POST",
    headers: { "Content-Type": "application/json", AccessKey: ACCESS_KEY },
    body: JSON.stringify({ title }),
  });
  if (!res.ok)
    throw new Error(`Create failed: ${res.status} ${await res.text()}`);
  return res.json();
}

async function uploadBinary(guid) {
  const stat = fs.statSync(file);
  const stream = fs.createReadStream(file);
  const res = await fetch(`${BASE}/library/${LIBRARY_ID}/videos/${guid}`, {
    method: "PUT",
    headers: {
      AccessKey: ACCESS_KEY,
      "Content-Type": "application/octet-stream",
      "Content-Length": String(stat.size),
    },
    body: stream,
  });
  if (!res.ok)
    throw new Error(`Upload failed: ${res.status} ${await res.text()}`);
}

try {
  console.log("Creating video...");
  const meta = await createVideo();
  const guid = meta.guid || meta.videoId || meta.id;
  if (!guid) throw new Error("No video guid in response");
  console.log("GUID:", guid);
  console.log("Uploading file...", file);
  await uploadBinary(guid);
  console.log("Done. Embed URL:");
  console.log(`https://iframe.mediadelivery.net/embed/${LIBRARY_ID}/${guid}`);
} catch (e) {
  console.error(e?.message || e);
  process.exit(1);
}
