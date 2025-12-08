import { NextRequest, NextResponse } from "next/server";
import { getParticipant } from "@/libs/participants";
import { createMagicToken } from "@/libs/magicToken";
import { sendEmail } from "@/libs/resend";
import { magicLinkEmail, magicLinkEmailSubject } from "@/emails/magicLink";
import config from "@/config";

export const runtime = "nodejs";

function getBaseUrl(req: NextRequest): string {
  // Check for forwarded host (production behind proxy)
  const forwardedHost = req.headers.get("x-forwarded-host");
  const forwardedProto = req.headers.get("x-forwarded-proto") || "https";

  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  // Fallback to config domain in production
  if (process.env.NODE_ENV === "production") {
    return `https://${config.domainName}`;
  }

  // Development: use request URL
  const url = new URL(req.url);
  return `${url.protocol}//${url.host}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email || "").trim().toLowerCase();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Bitte gib eine gültige E-Mail-Adresse ein." },
        { status: 400 }
      );
    }

    // Check if email is a participant
    const participant = await getParticipant(email);

    if (!participant || participant.status !== "active") {
      // Email not found or inactive - return specific error
      return NextResponse.json(
        {
          error: "not_found",
          message: "Diese E-Mail hat keinen Zugang zur Produktivitäts-Werkstatt.",
        },
        { status: 404 }
      );
    }

    // Create magic token
    const token = await createMagicToken(email);

    // Build verification URL
    const baseUrl = getBaseUrl(req);
    const verifyUrl = `${baseUrl}/auth/verify?token=${token}`;

    // Send email
    await sendEmail({
      to: email,
      subject: magicLinkEmailSubject,
      text: `Dein Login-Link: ${verifyUrl}\n\nDieser Link ist 15 Minuten gültig.`,
      html: magicLinkEmail(verifyUrl),
    });

    return NextResponse.json({
      success: true,
      message: "Wir haben dir einen Login-Link geschickt. Prüfe dein Postfach!",
    });
  } catch (error) {
    console.error("Magic link error:", error);
    return NextResponse.json(
      { error: "Ein Fehler ist aufgetreten. Bitte versuche es erneut." },
      { status: 500 }
    );
  }
}
