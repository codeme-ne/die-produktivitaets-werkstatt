/**
 * Event tracking API (PoC NDJSON logging)
 * POST /api/events
 * Body: { name: string, moduleSlug?: string, videoSlug?: string, meta?: any }
 */

import { NextRequest, NextResponse } from "next/server";
import { appendFileSync } from "fs";
import { join } from "path";
import { verifyAccess } from "@/libs/jwt";

const EVENTS_FILE = join(process.cwd(), "logs", "events.ndjson");

export async function POST(req: NextRequest) {
  try {
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
    const event = {
      timestamp: new Date().toISOString(),
      name,
      email,
      moduleSlug: moduleSlug || null,
      videoSlug: videoSlug || null,
      meta: meta || {},
    };

    // Append to NDJSON
    appendFileSync(EVENTS_FILE, JSON.stringify(event) + "\n", "utf-8");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Events API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
