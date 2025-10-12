import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { sendEmail } from "@/libs/resend";
import { welcomeEmail, welcomeEmailSubject } from "@/emails/welcome";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
  typescript: true,
});

/**
 * Stripe webhook handler - sends welcome email on successful checkout
 */
export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not configured");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 },
    );
  }

  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  // Verify Stripe event is legitimate
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`Webhook signature verification failed: ${message}`);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        // Only process paid sessions
        if (session.payment_status !== "paid") {
          console.log(
            `Session ${session.id} payment not completed, skipping email`,
          );
          break;
        }

        const email = session.customer_details?.email;

        if (!email) {
          console.error(`No email found for session ${session.id}`);
          break;
        }

        // Build magic link for immediate access
        const magicLink = `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id=${session.id}`;

        // Send welcome email
        await sendEmail({
          to: email,
          subject: welcomeEmailSubject,
          text: `Willkommen zum AI-Kurs! Klicke hier für Zugang: ${magicLink}`,
          html: welcomeEmail(magicLink),
        });

        console.log(`Welcome email sent to ${email} for session ${session.id}`);
        break;
      }

      default:
        // Ignore other event types
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`Webhook processing error: ${message}`);
    // Return 200 to acknowledge receipt, even if processing failed
    // This prevents Stripe from retrying on non-retryable errors
  }

  return NextResponse.json({ ok: true });
}
