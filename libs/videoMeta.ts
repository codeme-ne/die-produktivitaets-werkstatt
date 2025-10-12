import "server-only";
import type { VideoMeta } from "@/types/video";

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
    } catch (e) {
      console.warn("videoMeta: remote fetch error", e);
    }
  }
  // Fallback to local JSON (bundled)
  const local = (await import("@/content/videos/meta.json")).default as Record<
    string,
    VideoMeta
  >;
  cache = local || {};
  return cache;
}

export function getVideoMetaFor(
  guid: string,
  map: Record<string, VideoMeta>,
): VideoMeta | null {
  return map[guid] || null;
}
