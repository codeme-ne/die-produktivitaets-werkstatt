import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyAccess } from "@/libs/jwt";
import { checkRateLimit } from "@/libs/rateLimit";
import { getClientIp } from "@/libs/requestIp";
import { submitFeedback, listFeedback, feedbackStats } from "@/libs/feedback";
import { appendAuditLog } from "@/libs/auditLog";
import { requireAdminApi } from "@/libs/apiAuth";

const feedbackSchema = z.object({
  moduleSlug: z.string().min(1).optional(),
  lessonSlug: z.string().min(1).optional(),
  rating: z.number().int().min(1).max(5).optional(),
  message: z.string().min(5).max(4000),
});

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req as unknown as Request);
  const rate = await checkRateLimit({
    key: `feedback:post:${ip}`,
    limit: 30,
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

  const token = req.cookies.get("access_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: Awaited<ReturnType<typeof verifyAccess>>;
  try {
    payload = await verifyAccess(token);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const json = await req.json();
  const parsed = feedbackSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid feedback" }, { status: 400 });
  }

  let entry;
  try {
    entry = await submitFeedback({
      email: payload.email,
      moduleSlug: parsed.data.moduleSlug,
      lessonSlug: parsed.data.lessonSlug,
      rating: parsed.data.rating,
      message: parsed.data.message,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Feedback konnte nicht gespeichert werden";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  await appendAuditLog({
    type: "feedback.submitted",
    actor: payload.email,
    data: {
      moduleSlug: entry.moduleSlug,
      lessonSlug: entry.lessonSlug,
      rating: entry.rating,
      sentiment: entry.sentimentLabel,
    },
  });

  return NextResponse.json({ ok: true, feedback: entry });
}

export async function GET(req: NextRequest) {
  try {
    await requireAdminApi();
  } catch (error: any) {
    const message = error?.message || "Unauthorized";
    const normalized = message.toLowerCase();
    const status = normalized.includes("berechtigung") ? 403 : 401;
    return NextResponse.json({ error: message }, { status });
  }
  const url = new URL(req.url);
  const limitParam = url.searchParams.get("limit");
  const moduleSlug = url.searchParams.get("module");
  const lessonSlug = url.searchParams.get("lesson");
  const limit = limitParam ? Number(limitParam) : undefined;

  const [entries, stats] = await Promise.all([
    listFeedback({ limit, moduleSlug: moduleSlug || undefined, lessonSlug: lessonSlug || undefined }),
    feedbackStats(),
  ]);

  return NextResponse.json({ feedback: entries, stats });
}
