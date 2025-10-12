/*
  Bunny.net Stream minimal SDK (server-side)

  Notes
  - Auth: header `AccessKey: <BUNNY_STREAM_ACCESS_KEY>`
  - Base: https://video.bunnycdn.com
  - Library ID: BUNNY_STREAM_LIBRARY_ID

  Implemented endpoints (per Bunny Stream API):
  - POST /library/{libraryId}/videos                → create video metadata (returns GUID)
  - GET  /library/{libraryId}/videos                → list videos (paged)
  - PUT  /library/{libraryId}/videos/{videoId}      → upload binary file (server-to-server)
  - POST /library/{libraryId}/videos/{videoId}/source → ingest from external URL

  This module avoids client-side exposure of the AccessKey. Use from route handlers or server actions only.
*/

import "server-only";

const BASE = "https://video.bunnycdn.com";

function getEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export type BunnyVideo = {
  guid: string;
  title?: string;
  status?: number;
  length?: number;
  thumbnailUrl?: string;
  dateUploaded?: string;
  storageSize?: number;
};

export type BunnyListResponse = {
  items: BunnyVideo[];
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
};

function headers() {
  const key = getEnv("BUNNY_STREAM_ACCESS_KEY");
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    AccessKey: key,
  } as Record<string, string>;
}

export async function listVideos(params?: {
  page?: number;
  perPage?: number;
  search?: string;
}) {
  const libraryId = getEnv("BUNNY_STREAM_LIBRARY_ID");
  const url = new URL(`${BASE}/library/${libraryId}/videos`);
  if (params?.page) url.searchParams.set("page", String(params.page));
  if (params?.perPage) url.searchParams.set("perPage", String(params.perPage));
  if (params?.search) url.searchParams.set("search", params.search);
  const res = await fetch(url, { headers: headers(), cache: "no-store" });
  if (!res.ok) throw new Error(`Bunny listVideos failed: ${res.status}`);
  return (await res.json()) as BunnyListResponse;
}

export async function createVideo(input: {
  title: string;
  collectionId?: string;
  thumbnailUrl?: string;
}) {
  const libraryId = getEnv("BUNNY_STREAM_LIBRARY_ID");
  const res = await fetch(`${BASE}/library/${libraryId}/videos`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Bunny createVideo failed: ${res.status} ${text}`);
  }
  return (await res.json()) as BunnyVideo;
}

export async function ingestFromUrl(videoId: string, url: string) {
  const libraryId = getEnv("BUNNY_STREAM_LIBRARY_ID");
  const res = await fetch(
    `${BASE}/library/${libraryId}/videos/${videoId}/source`,
    {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ url }),
    },
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Bunny ingestFromUrl failed: ${res.status} ${text}`);
  }
  return await res.json();
}

export async function uploadBinary(
  videoId: string,
  file: Buffer,
  contentType = "application/octet-stream",
) {
  const libraryId = getEnv("BUNNY_STREAM_LIBRARY_ID");
  const key = getEnv("BUNNY_STREAM_ACCESS_KEY");
  const res = await fetch(`${BASE}/library/${libraryId}/videos/${videoId}`, {
    method: "PUT",
    headers: {
      AccessKey: key,
      "Content-Type": contentType,
    },
    body: file as unknown as BodyInit,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Bunny uploadBinary failed: ${res.status} ${text}`);
  }
  return true;
}

export function buildEmbedUrl(
  libraryId: string,
  videoId: string,
  params?: { autoplay?: boolean; muted?: boolean },
) {
  const u = new URL(
    `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}`,
  );
  if (params?.autoplay !== undefined)
    u.searchParams.set("autoplay", String(params.autoplay));
  if (params?.muted !== undefined)
    u.searchParams.set("muted", String(params.muted));
  return u.toString();
}

export function buildThumbnailUrl(
  libraryId: string,
  videoId: string,
  tSeconds = 1,
) {
  return `https://thumb.mediadelivery.net/${libraryId}/${videoId}/thumbnail.jpg?time=${tSeconds}`;
}
