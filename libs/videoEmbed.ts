/**
 * Video embed utilities for Bunny.net
 */

import { readFileSync, existsSync } from "fs";
import { join } from "path";
import type { VideoInfo } from "@/types/course";

interface VideoMetaCache {
  [guid: string]: {
    durationSec: number;
    title?: string;
    fetchedAt: string;
  };
}

let _cache: VideoMetaCache | null = null;

/**
 * Load video metadata cache (lazy, in-memory)
 */
function loadVideoMetaCache(): VideoMetaCache {
  if (_cache) return _cache;

  const cachePath = join(process.cwd(), "content", "video-meta.json");
  if (!existsSync(cachePath)) {
    _cache = {};
    return _cache;
  }

  try {
    const content = readFileSync(cachePath, "utf-8");
    _cache = JSON.parse(content);
    return _cache!;
  } catch {
    _cache = {};
    return _cache;
  }
}

/**
 * Parse Bunny play URL to extract library ID and GUID
 * @example parsePlayUrl("https://iframe.mediadelivery.net/play/457384/b9b86a03-620e-49ba-b3b8-9608c1ca411d")
 * => { libraryId: "457384", guid: "b9b86a03-620e-49ba-b3b8-9608c1ca411d" }
 */
export function parsePlayUrl(url: string): {
  libraryId: string;
  guid: string;
} | null {
  if (!url) return null;

  const match = url.match(/\/play\/([^/]+)\/([^/?]+)/);
  if (!match) return null;

  return {
    libraryId: match[1],
    guid: match[2],
  };
}

/**
 * Generate embed URL from library ID and GUID
 * @example toEmbedUrl("457384", "b9b86a03-620e-49ba-b3b8-9608c1ca411d")
 * => "https://iframe.mediadelivery.net/embed/457384/b9b86a03-620e-49ba-b3b8-9608c1ca411d"
 */
export function toEmbedUrl(libraryId: string, guid: string): string {
  return `https://iframe.mediadelivery.net/embed/${libraryId}/${guid}`;
}

/**
 * Parse play URL and return VideoInfo object ready for use
 * Loads duration from cache if available
 */
export function parseVideoUrl(url: string): VideoInfo | null {
  const parsed = parsePlayUrl(url);
  if (!parsed) return null;

  const cache = loadVideoMetaCache();
  const meta = cache[parsed.guid];

  return {
    libraryId: parsed.libraryId,
    guid: parsed.guid,
    embedUrl: toEmbedUrl(parsed.libraryId, parsed.guid),
    durationSec: meta?.durationSec,
  };
}
