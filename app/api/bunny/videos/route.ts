import { NextRequest } from "next/server";
import { createVideo, listVideos } from "@/libs/bunnyStream";
import { requireAdminApi } from "@/libs/apiAuth";
import { checkRateLimit } from "@/libs/rateLimit";
import { getClientIp } from "@/libs/requestIp";
import { getRequestId, logError } from "@/libs/logger";

export const runtime = "nodejs";

export async function GET() {
  try {
    // Require admin access
    await requireAdminApi();
    const rate = await checkRateLimit({
      key: "admin-bunny:list",
      limit: 60,
      windowMs: 60_000,
    });
    if (!rate.ok) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
        status: 429,
        headers: { "Retry-After": Math.ceil((rate.resetAt - Date.now()) / 1000).toString() },
      });
    }

    const data = await listVideos({ page: 1, perPage: 25 });
    if (!data) {
      return new Response(
        JSON.stringify({ error: "Bunny Stream nicht konfiguriert oder nicht erreichbar" }),
        { status: 503 },
      );
    }
    return Response.json(data, { status: 200 });
  } catch (e: any) {
    const message = e?.message || "Unknown error";
    const status =
      message.includes("nicht authentifiziert") ||
      message.includes("Berechtigung")
        ? 403
        : message.includes("Konfiguration")
          ? 503
          : 500;
    return new Response(
      JSON.stringify({ error: message }),
      { status },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Require admin access
    await requireAdminApi();
    const ip = getClientIp(req as unknown as Request);
    const requestId = getRequestId(req.headers);
    const rate = await checkRateLimit({
      key: `admin-bunny:create:${ip}`,
      limit: 30,
      windowMs: 60_000,
    });
    if (!rate.ok) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
        status: 429,
        headers: { "Retry-After": Math.ceil((rate.resetAt - Date.now()) / 1000).toString(), "x-request-id": requestId },
      });
    }

    const body = await req.json();
    if (!body?.title || typeof body.title !== "string") {
      return new Response(JSON.stringify({ error: "Missing 'title'" }), {
        status: 400,
      });
    }
    const video = await createVideo({
      title: body.title,
    });
    if (!video) {
      return new Response(
        JSON.stringify({ error: "Bunny Stream nicht konfiguriert oder fehlgeschlagen" }),
        { status: 503, headers: { "x-request-id": requestId } },
      );
    }
    return Response.json(video, { status: 201 });
  } catch (e: any) {
    const requestId = getRequestId(req.headers);
    const message = e?.message || "Unknown error";
    logError("Admin Bunny create failed", {
      error: message,
      requestId,
    });
    const status =
      message.includes("nicht authentifiziert") ||
      message.includes("Berechtigung")
        ? 403
        : message.includes("Konfiguration")
          ? 503
          : 500;
    return new Response(
      JSON.stringify({ error: message }),
      { status, headers: { "x-request-id": requestId } },
    );
  }
}
