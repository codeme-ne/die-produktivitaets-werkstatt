import { NextResponse } from "next/server";
import { signAccess } from "@/libs/jwt";

/**
 * Success route after Stripe checkout
 * Validates payment and sets access_token cookie
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.redirect(new URL("/?error=no_session", req.url));
    }

    // Dev fallback: accept any dev_ session in non-prod without Stripe verification
    const devFallback =
      process.env.NODE_ENV !== "production" ||
      process.env.NEXT_PUBLIC_DEV_MODE === "1";

    let email: string | undefined;
    let customerId: string | undefined;

    if (devFallback || sessionId.startsWith("dev_")) {
      email = "dev@local.test";
      customerId = "dev_cid";
    } else {
      // Fetch and validate session (dynamic import to avoid Stripe requirement in dev)
      const { findCheckoutSession } = await import("@/libs/stripe");
      const session = await findCheckoutSession(sessionId);

      if (!session) {
        return NextResponse.redirect(
          new URL("/?error=invalid_session", req.url),
        );
      }
      if (session.payment_status !== "paid") {
        return NextResponse.redirect(
          new URL("/?error=payment_not_completed", req.url),
        );
      }
      email = session.customer_details?.email || undefined;
      customerId =
        typeof session.customer === "string"
          ? session.customer
          : session.customer?.id;
      if (!email || !customerId) {
        return NextResponse.redirect(
          new URL("/?error=missing_customer_data", req.url),
        );
      }
    }

    // Generate JWT token
    const token = await signAccess({ email, cid: customerId });

    // Get next open lesson for redirect
    const { getNextOpenLesson } = await import("@/libs/pwCourse");
    const { getProgressForUser } = await import("@/libs/pwProgress");
    const progressMap = getProgressForUser(email);
    const nextLesson = getNextOpenLesson(progressMap);

    // Create redirect response with cookie
    const redirectUrl = new URL(
      `/kurs/${nextLesson.moduleSlug}/${nextLesson.lessonSlug}`,
      req.url,
    );
    const response = NextResponse.redirect(redirectUrl);

    response.cookies.set("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 31536000, // 365 days
    });

    return response;
  } catch (error) {
    console.error("Success route error:", error);
    return NextResponse.redirect(new URL("/?error=server_error", req.url));
  }
}
