/**
 * Progress tracking API (PoC file-based storage)
 * POST /api/progress
 * Body: { moduleSlug: string, videoSlug: string, done: boolean }
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyAccess } from "@/libs/jwt";
import { checkRateLimit } from "@/libs/rateLimit";
import { getClientIp } from "@/libs/requestIp";
import { getProgressForUser, setProgressEntry } from "@/libs/pwProgress";

export async function POST(req: NextRequest) {
  try {
    // Basic rate limit per client
    const ip = getClientIp(req as unknown as Request);
    const rate = await checkRateLimit({
      key: `progress:post:${ip}`,
      limit: 60,
      windowMs: 60_000,
    });
    if (!rate.ok) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429, headers: { "Retry-After": Math.ceil((rate.resetAt - Date.now()) / 1000).toString() } },
      );
    }

    // Get email from JWT cookie
    const token = req.cookies.get("access_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyAccess(token);
    const email = payload.email;

    // Parse request
    const body = await req.json();
    const { done } = body;
    const moduleCandidate = body.moduleSlug ?? body.module;
    const videoCandidate = body.videoSlug ?? body.video;

    if (
      typeof moduleCandidate !== "string" ||
      typeof videoCandidate !== "string" ||
      moduleCandidate.length === 0 ||
      videoCandidate.length === 0 ||
      typeof done !== "boolean"
    ) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const moduleSlug = moduleCandidate;
    const videoSlug = videoCandidate;

    const userAgent = req.headers.get("user-agent");
    const result = await setProgressEntry({
      email,
      moduleSlug,
      videoSlug,
      done,
      sourceIp: ip,
      userAgent,
    });

    return NextResponse.json({ success: true, key: result.key, done, version: result.version });
  } catch (error) {
    console.error("Progress API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // Basic rate limit per client
    const ip = getClientIp(req as unknown as Request);
    const rate = await checkRateLimit({
      key: `progress:get:${ip}`,
      limit: 120,
      windowMs: 60_000,
    });
    if (!rate.ok) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429, headers: { "Retry-After": Math.ceil((rate.resetAt - Date.now()) / 1000).toString() } },
      );
    }

    // Get email from JWT cookie
    const token = req.cookies.get("access_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyAccess(token);
    const email = payload.email;

    // Read progress (DB if available, otherwise file)
    const userProgress = await getProgressForUser(email);

    return NextResponse.json({ progress: userProgress });
  } catch (error) {
    console.error("Progress API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
