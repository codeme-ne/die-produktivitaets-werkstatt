import { NextRequest, NextResponse } from "next/server";
import { verifyAccess } from "@/libs/jwt";
import { checkRateLimit } from "@/libs/rateLimit";
import { getClientIp } from "@/libs/requestIp";
import { searchCourseContent } from "@/libs/search";
import { appendAuditLog } from "@/libs/auditLog";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const query = url.searchParams.get("q")?.trim() || "";
  const limitParam = url.searchParams.get("limit");
  const limit = limitParam ? Number(limitParam) : 10;

  if (!query || query.length < 2) {
    return NextResponse.json({ error: "query too short" }, { status: 400 });
  }

  const token = req.cookies.get("access_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const payload = await verifyAccess(token);

  const ip = getClientIp(req as unknown as Request);
  const rate = await checkRateLimit({
    key: `search:${ip}`,
    limit: 60,
    windowMs: 60_000,
  });
  if (!rate.ok) {
    return NextResponse.json(
      { error: "Rate limit exceeded" },
      {
        status: 429,
        headers: {
          "Retry-After": Math.ceil((rate.resetAt - Date.now()) / 1000).toString(),
        },
      },
    );
  }

  const results = await searchCourseContent({
    query,
    productType: payload.productType ?? "live",
  });

  await appendAuditLog({
    type: "search.query",
    actor: payload.email,
    data: { query, resultCount: results.length, productType: payload.productType },
  });

  return NextResponse.json({ results: results.slice(0, Math.max(1, Math.min(limit, 25))) });
}
