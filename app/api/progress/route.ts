/**
 * Progress tracking API (PoC file-based storage)
 * POST /api/progress
 * Body: { moduleSlug: string, videoSlug: string, done: boolean }
 */

import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { verifyAccess } from "@/libs/jwt";

interface ProgressData {
  [email: string]: {
    [key: string]: boolean; // key: "module/video"
  };
}

const PROGRESS_FILE = join(process.cwd(), "logs", "progress.json");

function readProgress(): ProgressData {
  try {
    const content = readFileSync(PROGRESS_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    return {};
  }
}

function writeProgress(data: ProgressData): void {
  // Atomic write: temp file + rename
  const tempFile = `${PROGRESS_FILE}.tmp`;
  writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf-8");
  writeFileSync(PROGRESS_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function POST(req: NextRequest) {
  try {
    // Get email from JWT cookie
    const token = req.cookies.get("access_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyAccess(token);
    const email = payload.email;

    // Parse request
    const body = await req.json();
    const { moduleSlug, videoSlug, done } = body;

    if (!moduleSlug || !videoSlug || typeof done !== "boolean") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Update progress
    const progress = readProgress();
    if (!progress[email]) {
      progress[email] = {};
    }

    const key = `${moduleSlug}/${videoSlug}`;
    if (done) {
      progress[email][key] = true;
    } else {
      delete progress[email][key];
    }

    writeProgress(progress);

    return NextResponse.json({ success: true, key, done });
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
    // Get email from JWT cookie
    const token = req.cookies.get("access_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyAccess(token);
    const email = payload.email;

    // Read progress
    const progress = readProgress();
    const userProgress = progress[email] || {};

    return NextResponse.json({ progress: userProgress });
  } catch (error) {
    console.error("Progress API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
