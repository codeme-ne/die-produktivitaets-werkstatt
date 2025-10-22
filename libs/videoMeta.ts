import "server-only";
import { readFile } from "fs/promises";
import { join } from "path";
import type { VideoMeta } from "@/types/video";

const LOCAL_META_PATH = join(process.cwd(), "content/videos/meta.json");

let cache: Record<string, VideoMeta> | null = null;

export async function loadVideoMeta(): Promise<Record<string, VideoMeta>> {
  if (cache) return cache;
  const remote = process.env.NEXT_PUBLIC_VIDEO_META_URL;
  if (remote) {
    try {
      const res = await fetch(remote, { cache: "no-store" });
      if (res.ok) {
        cache = (await res.json()) as Record<string, VideoMeta>;
        return cache || {};
      }
      console.warn("videoMeta: remote fetch failed", res.status);
    } catch (error) {
      console.warn("videoMeta: remote fetch error", error);
    }
  }

  try {
    const raw = await readFile(LOCAL_META_PATH, "utf-8");
    cache = JSON.parse(raw) as Record<string, VideoMeta>;
  } catch (error) {
    console.warn("videoMeta: local meta.json missing, returning empty map", {
      error,
    });
    cache = {};
  }

  return cache;
}

export function getVideoMetaFor(
  guid: string,
  map: Record<string, VideoMeta>,
): VideoMeta | null {
  return map[guid] || null;
}
