import { NextRequest } from "next/server";
import { createVideo, listVideos } from "@/libs/bunnyStream";
import { requireAdminApi } from "@/libs/apiAuth";

export const runtime = "nodejs";

export async function GET() {
  try {
    // Require admin access
    await requireAdminApi();

    const data = await listVideos({ page: 1, perPage: 25 });
    return Response.json(data, { status: 200 });
  } catch (e: any) {
    const status =
      e?.message?.includes("nicht authentifiziert") ||
      e?.message?.includes("Berechtigung")
        ? 403
        : 500;
    return new Response(
      JSON.stringify({ error: e?.message || "Unknown error" }),
      { status },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Require admin access
    await requireAdminApi();

    const body = await req.json();
    if (!body?.title || typeof body.title !== "string") {
      return new Response(JSON.stringify({ error: "Missing 'title'" }), {
        status: 400,
      });
    }
    const video = await createVideo({
      title: body.title,
    });
    return Response.json(video, { status: 201 });
  } catch (e: any) {
    const status =
      e?.message?.includes("nicht authentifiziert") ||
      e?.message?.includes("Berechtigung")
        ? 403
        : 500;
    return new Response(
      JSON.stringify({ error: e?.message || "Unknown error" }),
      { status },
    );
  }
}
