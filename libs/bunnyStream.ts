/**
 * Bunny Stream API client for fetching video metadata
 */

// Helper to get API key from env (supports both naming conventions)
function getApiKey(): string | undefined {
  return process.env.BUNNY_STREAM_ACCESS_KEY || process.env.BUNNY_STREAM_API_KEY;
}

// Helper to get library ID from env
function getLibraryId(): string | undefined {
  return (
    process.env.BUNNY_LIBRARY_ID ||
    process.env.BUNNY_STREAM_LIBRARY_ID ||
    process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID
  );
}

function requireAdminConfig(): { apiKey: string; libraryId: string } {
  const apiKey = getApiKey();
  const libraryId = getLibraryId();
  if (!apiKey || !libraryId) {
    throw new Error("Bunny Stream Konfiguration fehlt (Key oder LibraryId)");
  }
  return { apiKey, libraryId };
}

export interface BunnyVideoMeta {
  guid: string;
  length: number; // Duration in seconds
  title?: string;
  thumbnailFileName?: string;
}

/**
 * Fetch video metadata from Bunny Stream API
 */
export async function getVideoMeta(
  libraryId: string,
  guid: string,
): Promise<BunnyVideoMeta | null> {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("BUNNY_STREAM_ACCESS_KEY or BUNNY_STREAM_API_KEY not set, skipping video meta fetch");
    return null;
  }

  const url = `https://video.bunnycdn.com/library/${libraryId}/videos/${guid}`;
  const timeout = parseInt(process.env.BUNNY_STREAM_TIMEOUT_MS || "10000", 10);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      headers: {
        AccessKey: apiKey,
        accept: "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(
        `Bunny API error for ${guid}: ${response.status} ${response.statusText}`,
      );
      return null;
    }

    const data = await response.json();

    return {
      guid: data.guid,
      length: data.length || 0,
      title: data.title,
      thumbnailFileName: data.thumbnailFileName,
    };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.error(`Bunny API timeout for ${guid} after ${timeout}ms`);
    } else {
      console.error(`Bunny API error for ${guid}:`, error);
    }
    return null;
  }
}

/**
 * Fetch multiple videos with rate limiting and retries
 */
export async function getVideosMetaBatch(
  videos: { libraryId: string; guid: string }[],
  options?: {
    rateLimit?: number; // Requests per second (default: 10)
    maxRetries?: number; // Max retry attempts (default: 3)
    retryDelay?: number; // Initial retry delay in ms (default: 1000)
  },
): Promise<Map<string, BunnyVideoMeta>> {
  const { rateLimit = 10, maxRetries = 3, retryDelay = 1000 } = options || {};
  const results = new Map<string, BunnyVideoMeta>();
  const delayMs = 1000 / rateLimit;

  for (const { libraryId, guid } of videos) {
    let attempts = 0;
    let success = false;
    let currentDelay = retryDelay;

    while (attempts < maxRetries && !success) {
      attempts++;
      const meta = await getVideoMeta(libraryId, guid);

      if (meta) {
        results.set(guid, meta);
        success = true;
      } else if (attempts < maxRetries) {
        // Exponential backoff
        await new Promise((resolve) => setTimeout(resolve, currentDelay));
        currentDelay *= 2;
      }
    }

    // Rate limiting delay (only between successful requests)
    if (success && delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return results;
}

/**
 * Admin functions for video management
 */

export interface BunnyVideo {
  guid: string;
  title: string;
  length: number;
  status: number;
  thumbnailFileName?: string;
  dateUploaded?: string;
}

export interface BunnyListResponse {
  items: BunnyVideo[];
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
}

/**
 * List all videos in library
 */
export async function listVideos(options?: {
  page?: number;
  perPage?: number;
}): Promise<BunnyListResponse | null> {
  const { page = 1, perPage = 100 } = options || {};
  const { apiKey, libraryId } = requireAdminConfig();

  const url = `https://video.bunnycdn.com/library/${libraryId}/videos?page=${page}&itemsPerPage=${perPage}`;

  try {
    const response = await fetch(url, {
      headers: { AccessKey: apiKey, accept: "application/json" },
    });

    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

/**
 * Create a new video
 */
export async function createVideo(options: {
  title: string;
}): Promise<BunnyVideo | null> {
  const { title } = options;
  const { apiKey, libraryId } = requireAdminConfig();

  const url = `https://video.bunnycdn.com/library/${libraryId}/videos`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        AccessKey: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

/**
 * Ingest video from URL
 */
export async function ingestFromUrl(
  guid: string,
  url: string,
): Promise<boolean> {
  const apiKey = getApiKey();
  const libraryId = getLibraryId();
  if (!apiKey || !libraryId) return false;

  const endpoint = `https://video.bunnycdn.com/library/${libraryId}/videos/${guid}/fetch`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        AccessKey: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    return response.ok;
  } catch {
    return false;
  }
}
