import { NextResponse } from "next/server";
import { z } from "zod";

const checkoutSchema = z.object({
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request: successUrl and cancelUrl are required" },
        { status: 400 },
      );
    }

    const { successUrl, cancelUrl } = parsed.data;

    // Dev fallback: if no Stripe key in non-production, skip Stripe and redirect straight to success
    // In development, always allow a fake checkout to simplify local testing
    const devFallback =
      process.env.NODE_ENV !== "production" ||
      process.env.NEXT_PUBLIC_DEV_MODE === "1";

    if (devFallback) {
      const fakeSessionId = `dev_${Date.now()}`;
      const url = `${successUrl}?session_id=${fakeSessionId}`;
      return NextResponse.json({ url });
    }

    // Create checkout session with server-side price lookup (dynamic import to avoid requiring Stripe in dev)
    const { createCheckout } = await import("@/libs/stripe");
    const url = await createCheckout({ successUrl, cancelUrl });
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Checkout creation error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Failed to create checkout session";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
