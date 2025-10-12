import { NextRequest } from "next/server";
import { signAccess } from "@/libs/jwt";
import { cookies } from "next/headers";
import config from "@/config";

export const runtime = "nodejs";

/**
 * DEV ONLY: Quick admin login for local development
 * Sets JWT cookie with admin email from config
 *
 * Usage: GET http://localhost:3000/api/dev/admin-login
 */
export async function GET(req: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return new Response("Not available in production", { status: 403 });
  }

  try {
    // Get first admin email from config
    const adminEmail = config.adminEmails[0];
    if (!adminEmail) {
      return new Response("No admin email configured in config.ts", {
        status: 500,
      });
    }

    // Create JWT with admin email (mimicking Stripe success flow)
    const fakeCid = `dev_admin_${Date.now()}`;
    const token = await signAccess({ email: adminEmail, cid: fakeCid });

    // Set cookie (same as /checkout/success does)
    const cookieStore = await cookies();
    cookieStore.set("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
    });

    // Redirect to admin videos page
    return Response.redirect(new URL("/dashboard/admin/videos", req.url));
  } catch (e: any) {
    return new Response(
      JSON.stringify({ error: e?.message || "Unknown error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
