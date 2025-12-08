import { NextRequest } from "next/server";
import { signAccess } from "@/libs/jwt";
import { isAdmin } from "@/libs/authz";
import { getProgressForUser } from "@/libs/pwProgress";
import { getNextOpenLesson } from "@/libs/pwCourse";
import { DEFAULT_PRODUCT, type CourseProduct } from "@/types/products";
import { getReleaseMapForProduct } from "@/libs/releases";

export const runtime = "nodejs";

/**
 * Dev login helper to set the JWT cookie without Stripe.
 * Usage (dev only):
 *   /dev/login?email=you@example.com&cid=dev_cid&to=/dashboard
 *
 * Enabled when NODE_ENV !== 'production' OR NEXT_PUBLIC_DEV_MODE === '1'.
 */
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  // Server-only check - DEV_MODE is not exposed to client
  const devEnabled =
    process.env.NODE_ENV !== "production" ||
    process.env.DEV_MODE === "1";
  if (!devEnabled) {
    return new Response("Not Found", { status: 404 });
  }

  const email = (url.searchParams.get("email") || "dev@local.test").trim();
  const cid = (url.searchParams.get("cid") || "dev_cid").trim();
  const productParam = url.searchParams.get("product");
  const productType: CourseProduct =
    productParam === "self-paced" || productParam === "live"
      ? productParam
      : DEFAULT_PRODUCT;

  // Determine redirect: explicit ?to, admin panel, or last open lesson
  let to = url.searchParams.get("to");
  if (!to) {
    if (isAdmin(email)) {
      to = "/dashboard/admin/videos";
    } else {
      const progress = await getProgressForUser(email);
      const releaseMap = await getReleaseMapForProduct(productType);
      const nextLesson = getNextOpenLesson(progress, releaseMap, productType);
      to = `/kurs/${nextLesson.moduleSlug}/${nextLesson.lessonSlug}`;
    }
  }

  try {
    const token = await signAccess({ email, cid, productType });
    const { upsertParticipant } = await import("@/libs/participants");
    await upsertParticipant({
      email,
      productType,
      stripeCustomerId: cid,
      status: "active",
    });
    const res = new Response(null, {
      status: 302,
      headers: {
        Location: to!,
        "Set-Cookie": `access_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 14}; ${
          process.env.NODE_ENV === "production" ? "Secure; " : ""
        }`,
      },
    });
    return res;
  } catch {
    return new Response("Failed to sign token", { status: 500 });
  }
}
