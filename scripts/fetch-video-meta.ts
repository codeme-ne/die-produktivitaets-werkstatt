#!/usr/bin/env tsx
/**
 * Fetch video metadata from Bunny Stream API and cache to content/video-meta.json
 * Run: npx tsx scripts/fetch-video-meta.ts
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { loadCourse } from "../libs/pwCourse";
import { getVideosMetaBatch } from "../libs/bunnyStream";

interface VideoMetaCache {
  [guid: string]: {
    durationSec: number;
    title?: string;
    fetchedAt: string;
  };
}

const CACHE_PATH = join(process.cwd(), "content", "video-meta.json");

async function main() {
  console.log("🎥 Fetching video metadata from Bunny Stream...\n");

  // Load existing cache
  let cache: VideoMetaCache = {};
  if (existsSync(CACHE_PATH)) {
    const content = readFileSync(CACHE_PATH, "utf-8");
    cache = JSON.parse(content);
    console.log(`📦 Loaded ${Object.keys(cache).length} cached entries\n`);
  }

  // Load course and collect all videos
  const course = loadCourse();
  const videos: { libraryId: string; guid: string }[] = [];

  for (const module of course.modules) {
    for (const lesson of module.lessons) {
      if (lesson.video) {
        const { libraryId, guid } = lesson.video;

        // Skip if already cached
        if (cache[guid]) {
          console.log(`✓ Skipping ${guid} (cached)`);
          continue;
        }

        videos.push({ libraryId, guid });
      }
    }
  }

  if (videos.length === 0) {
    console.log("✅ All videos already cached!");
    return;
  }

  console.log(`\n🔄 Fetching ${videos.length} missing videos...\n`);

  // Fetch metadata with rate limiting
  const results = await getVideosMetaBatch(videos, {
    rateLimit: 10, // 10 requests/second
    maxRetries: 3,
    retryDelay: 1000,
  });

  // Update cache
  let newCount = 0;
  for (const [guid, meta] of results.entries()) {
    cache[guid] = {
      durationSec: meta.length,
      title: meta.title,
      fetchedAt: new Date().toISOString(),
    };
    newCount++;
    console.log(`✓ Fetched ${guid}: ${meta.length}s`);
  }

  // Write cache to disk
  writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2), "utf-8");
  console.log(
    `\n✅ Done! Added ${newCount} new entries. Total: ${Object.keys(cache).length}`,
  );
  console.log(`📝 Cache written to: ${CACHE_PATH}`);
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
