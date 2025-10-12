#!/usr/bin/env node
/**
 * Upload images to Bunny Storage CDN
 * Usage: node scripts/upload-images.mjs --dir modul-01 --file ./cover.jpg
 */

import { readFileSync } from "fs";
import { basename } from "path";

const ZONE = process.env.BUNNY_STORAGE_ZONE;
const KEY = process.env.BUNNY_STORAGE_API_KEY;
const HOST = process.env.BUNNY_STORAGE_HOSTNAME || "storage.bunnycdn.com";

if (!ZONE || !KEY) {
  console.error("❌ Missing BUNNY_STORAGE_ZONE or BUNNY_STORAGE_API_KEY");
  process.exit(1);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--")) {
      const key = args[i].slice(2);
      const val =
        args[i + 1] && !args[i + 1].startsWith("--") ? args[++i] : true;
      parsed[key] = val;
    }
  }
  return parsed;
}

async function uploadFile(localPath, remotePath) {
  const file = readFileSync(localPath);
  const url = `https://${HOST}/${ZONE}/${remotePath}`;

  console.log(`📤 Uploading ${localPath} → ${url}`);

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      AccessKey: KEY,
      "Content-Type": "application/octet-stream",
    },
    body: file,
  });

  if (!res.ok) {
    throw new Error(`Upload failed: ${res.status} ${await res.text()}`);
  }

  console.log(`✅ Uploaded: https://pw-bunny.b-cdn.net/${remotePath}`);
  return remotePath;
}

async function main() {
  const args = parseArgs();
  const { dir, file } = args;

  if (!dir || !file) {
    console.error(
      "Usage: node scripts/upload-images.mjs --dir modul-01 --file ./cover.jpg",
    );
    process.exit(1);
  }

  const filename = basename(file);
  const remotePath = `${dir}/${filename}`;

  await uploadFile(file, remotePath);
  console.log(`\n💡 CDN URL: https://pw-bunny.b-cdn.net/${remotePath}`);
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
