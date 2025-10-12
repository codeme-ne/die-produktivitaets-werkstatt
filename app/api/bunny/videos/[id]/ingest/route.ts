import { NextRequest } from "next/server";
import { ingestFromUrl } from "@/libs/bunnyStream";
import { requireAdminApi } from "@/libs/apiAuth";

export const runtime = "nodejs";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Require admin access
    await requireAdminApi();

    const { id } = await params;
    const body = await req.json();
    if (!body?.url || typeof body.url !== "string") {
      return new Response(JSON.stringify({ error: "Missing 'url'" }), {
        status: 400,
      });
    }
    const result = await ingestFromUrl(id, body.url);
    return Response.json(result, { status: 200 });
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
