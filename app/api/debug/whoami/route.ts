import { verifyAccess } from "@/libs/jwt";
import { isAdmin } from "@/libs/authz";
import { cookies } from "next/headers";

export const runtime = "nodejs";

/**
 * Debug endpoint: returns current user payload if JWT is present.
 * GET /api/debug/whoami
 */
export async function GET() {
  try {
    const store = await cookies();
    const token = store.get("access_token")?.value;
    if (!token) return Response.json({ authenticated: false }, { status: 200 });
    const payload = await verifyAccess(token);
    const admin = isAdmin(payload.email);
    return Response.json(
      { authenticated: true, email: payload.email, cid: payload.cid, admin },
      { status: 200 },
    );
  } catch (e: any) {
    return Response.json(
      { authenticated: false, error: e?.message || "Invalid token" },
      { status: 200 },
    );
  }
}
