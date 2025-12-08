import { NextResponse } from "next/server";
import { verifyMagicToken } from "@/libs/magicToken";
import { getParticipant } from "@/libs/participants";
import { signAccess } from "@/libs/jwt";
import { getProgressForUser } from "@/libs/pwProgress";
import { getNextOpenLesson } from "@/libs/pwCourse";
import { getReleaseMapForProduct } from "@/libs/releases";

export const runtime = "nodejs";

/**
 * Verifies magic link token and sets access_token cookie
 * Redirects directly to the next open lesson
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(new URL("/login?error=no_token", req.url));
    }

    // Verify token
    const result = await verifyMagicToken(token);

    if (!result.valid || !result.email) {
      const errorParam =
        result.error === "expired"
          ? "expired"
          : result.error === "already_used"
            ? "used"
            : "invalid";
      return NextResponse.redirect(
        new URL(`/login?error=${errorParam}`, req.url)
      );
    }

    // Get participant
    const participant = await getParticipant(result.email);

    if (!participant || participant.status !== "active") {
      return NextResponse.redirect(new URL("/login?error=no_access", req.url));
    }

    // Sign JWT
    const jwtToken = await signAccess({
      email: result.email,
      cid: participant.stripeCustomerId || "magic_link",
      productType: participant.productType,
    });

    // Get next open lesson
    const progressMap = await getProgressForUser(result.email);
    const releaseMap = await getReleaseMapForProduct(participant.productType);
    const nextLesson = getNextOpenLesson(
      progressMap,
      releaseMap,
      participant.productType
    );

    // Redirect to course with cookie
    const redirectUrl = new URL(
      `/kurs/${nextLesson.moduleSlug}/${nextLesson.lessonSlug}`,
      req.url
    );
    const response = NextResponse.redirect(redirectUrl);

    response.cookies.set("access_token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (error) {
    console.error("Verify route error:", error);
    return NextResponse.redirect(new URL("/login?error=server", req.url));
  }
}
