import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
  typescript: true,
});

/**
 * Get the course price ID from Stripe using lookup_key
 * Falls back to env var if lookup fails
 */
export async function getCoursePriceId(): Promise<string> {
  try {
    const prices = await stripe.prices.list({
      lookup_keys: ["ai_course_eur"],
      active: true,
      limit: 1,
    });

    if (prices.data.length > 0) {
      return prices.data[0].id;
    }

    // Fallback to env var
    if (process.env.STRIPE_PRICE_ID_COURSE_EUR) {
      return process.env.STRIPE_PRICE_ID_COURSE_EUR;
    }

    throw new Error(
      'Course price not configured - set lookup_key "ai_course_eur" in Stripe or STRIPE_PRICE_ID_COURSE_EUR env var',
    );
  } catch (error) {
    console.error("Error fetching course price:", error);
    throw error;
  }
}

/**
 * Create a simplified checkout session for the course
 */
export async function createCheckout({
  successUrl,
  cancelUrl,
}: {
  successUrl: string;
  cancelUrl: string;
}): Promise<string> {
  try {
    const priceId = await getCoursePriceId();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: false,
      customer_creation: "always",
      payment_intent_data: {
        setup_future_usage: "on_session",
      },
    });

    if (!session.url) {
      throw new Error("Failed to create checkout session URL");
    }

    return session.url;
  } catch (error) {
    console.error("Error creating checkout:", error);
    throw error;
  }
}

/**
 * Find and expand a checkout session by ID
 */
export async function findCheckoutSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "customer"],
    });

    return session;
  } catch (error) {
    console.error("Error finding checkout session:", error);
    return null;
  }
}

export default stripe;
