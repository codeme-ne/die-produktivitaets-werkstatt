import { NextResponse } from "next/server";
import { createCheckout } from "@/libs/stripe";
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
        { status: 400 }
      );
    }

    const { successUrl, cancelUrl } = parsed.data;

    // Create checkout session with server-side price lookup
    const url = await createCheckout({
      successUrl,
      cancelUrl,
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Checkout creation error:", error);
    
    const message = error instanceof Error ? error.message : "Failed to create checkout session";
    
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
