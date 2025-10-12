import { NextResponse } from "next/server";
import { signAccess } from "@/libs/jwt";
import { isAdmin } from "@/libs/authz";

export const runtime = "nodejs";

/**
 * Dev login helper to set the JWT cookie without Stripe.
 * Usage (dev only):
 *   /dev/login?email=you@example.com&cid=dev_cid&to=/dashboard
 *
 * Enabled when NODE_ENV !== 'production' OR NEXT_PUBLIC_DEV_MODE === '1'.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const devEnabled =
    process.env.NODE_ENV !== "production" ||
    process.env.NEXT_PUBLIC_DEV_MODE === "1";
  if (!devEnabled) {
    return new Response("Not Found", { status: 404 });
  }

  const email = (url.searchParams.get("email") || "dev@local.test").trim();
  const cid = (url.searchParams.get("cid") || "dev_cid").trim();
  const to =
    url.searchParams.get("to") ||
    (isAdmin(email) ? "/dashboard/admin/videos" : "/dashboard");

  try {
    const token = await signAccess({ email, cid });
    const res = NextResponse.redirect(new URL(to, req.url));
    res.cookies.set("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 31536000,
    });
    return res;
  } catch {
    return new Response("Failed to sign token", { status: 500 });
  }
}
