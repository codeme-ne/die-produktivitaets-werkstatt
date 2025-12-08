/**
 * Event tracking API (PoC NDJSON logging)
 * POST /api/events
 * Body: { name: string, moduleSlug?: string, videoSlug?: string, meta?: any }
 */

import { NextRequest, NextResponse } from "next/server";
import { appendFileSync, existsSync, mkdirSync, statSync, renameSync } from "fs";
import { dirname, join } from "path";
import { verifyAccess } from "@/libs/jwt";
import { checkRateLimit } from "@/libs/rateLimit";
import { getClientIp } from "@/libs/requestIp";

const EVENTS_FILE = join(process.cwd(), "logs", "events.ndjson");
const LOG_DIR = dirname(EVENTS_FILE);
const MAX_EVENT_BYTES = 8_000; // cap single event to avoid runaway payloads
const ROTATE_BYTES = 5 * 1024 * 1024; // 5MB

function ensureLogDir() {
  if (!existsSync(LOG_DIR)) {
    mkdirSync(LOG_DIR, { recursive: true });
  }
}

function rotateIfNeeded() {
  if (!existsSync(EVENTS_FILE)) return;
  try {
    const size = statSync(EVENTS_FILE).size;
    if (size >= ROTATE_BYTES) {
      const rotated = `${EVENTS_FILE}.${Date.now()}.1`;
      renameSync(EVENTS_FILE, rotated);
    }
  } catch {
    // ignore rotation errors to keep endpoint responsive
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req as unknown as Request);
    const rate = await checkRateLimit({
      key: `events:post:${ip}`,
      limit: 120,
      windowMs: 60_000,
    });
    if (!rate.ok) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429, headers: { "Retry-After": Math.ceil((rate.resetAt - Date.now()) / 1000).toString() } },
      );
    }

    // Optional: Get email from JWT (not required for all events)
    let email: string | null = null;
    const token = req.cookies.get("access_token")?.value;
    if (token) {
      try {
        const payload = await verifyAccess(token);
        email = payload.email;
      } catch {
        // Invalid token, continue without email
      }
    }

    // Parse request
    const body = await req.json();
    const { name, moduleSlug, videoSlug, meta } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Build event
    let safeMeta: unknown = {};
    if (typeof meta === "string") {
      safeMeta = meta.slice(0, 4000);
    } else if (meta && typeof meta === "object") {
      try {
        safeMeta = JSON.parse(JSON.stringify(meta, (_k, v) => v, 2));
      } catch {
        safeMeta = { error: "meta_not_serializable" };
      }
    }

    const event = {
      timestamp: new Date().toISOString(),
      name,
      email,
      moduleSlug: moduleSlug || null,
      videoSlug: videoSlug || null,
      meta: safeMeta,
    };

    const payload = JSON.stringify(event);
    if (payload.length > MAX_EVENT_BYTES) {
      return NextResponse.json(
        { error: "Event too large" },
        { status: 413 },
      );
    }

    ensureLogDir();
    rotateIfNeeded();

    // Append to NDJSON
    appendFileSync(EVENTS_FILE, `${payload}\n`, "utf-8");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Events API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
