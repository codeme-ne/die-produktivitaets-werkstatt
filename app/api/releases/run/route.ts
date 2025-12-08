import { NextResponse, type NextRequest } from "next/server";
import { processDueReleases } from "@/libs/releases";
import { checkRateLimit } from "@/libs/rateLimit";
import { getClientIp } from "@/libs/requestIp";
import { getRequestId, logError, logInfo } from "@/libs/logger";

function getExpectedSecret(): string | null {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return null;
  return secret;
}

function isAuthorized(req: NextRequest, expected: string): boolean {
  const header = req.headers.get("authorization");
  if (header && header === `Bearer ${expected}`) return true;

  const url = new URL(req.url);
  return url.searchParams.get("token") === expected;
}

export async function POST(req: NextRequest) {
  const requestId = getRequestId(req.headers);
  const expected = getExpectedSecret();
  if (!expected) {
    logError("CRON_SECRET not configured", { requestId });
    return NextResponse.json(
      { error: "CRON_SECRET missing" },
      { status: 500, headers: { "x-request-id": requestId } },
    );
  }

  if (!isAuthorized(req, expected)) {
    logError("Unauthorized cron call", { requestId });
    return NextResponse.json(
      { error: "unauthorized" },
      { status: 401, headers: { "x-request-id": requestId } },
    );
  }

  const ip = getClientIp(req as unknown as Request);
  const rate = await checkRateLimit({
    key: `cron-releases:${ip}`,
    limit: 10,
    windowMs: 60_000,
  });
  if (!rate.ok) {
    return NextResponse.json(
      { error: "Rate limit exceeded" },
      {
        status: 429,
        headers: {
          "Retry-After": Math.ceil((rate.resetAt - Date.now()) / 1000).toString(),
          "x-request-id": requestId,
        },
      },
    );
  }

  await processDueReleases();
  logInfo("Cron releases executed", { requestId, ip });
  return NextResponse.json({ ok: true }, { headers: { "x-request-id": requestId } });
}

export async function GET(req: NextRequest) {
  return POST(req);
}
