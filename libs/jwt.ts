import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { DEFAULT_PRODUCT, type CourseProduct } from "@/types/products";
import config from "@/config";

export interface AccessTokenPayload extends JWTPayload {
  email: string;
  cid: string; // Stripe customer ID
  productType?: CourseProduct;
  isAdmin?: boolean; // Explicit admin claim for authorization
}

/**
 * Get the JWT secret (lazy-loaded to avoid build-time errors)
 */
function getSecret(): Uint8Array {
  // In development, allow a built-in fallback so local testing works without env keys
  const isProd = process.env.NODE_ENV === "production";
  const secret =
    process.env.JWT_SECRET ||
    (!isProd ? "dev-secret-please-change" : undefined);
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is required");
  }
  return new TextEncoder().encode(secret);
}

/**
 * Sign an access token with email and customer ID
 * @param payload - { email, cid }
 * @returns JWT token string
 */
export async function signAccess(payload: {
  email: string;
  cid: string;
  productType?: CourseProduct;
}): Promise<string> {
  const productType = payload.productType || DEFAULT_PRODUCT;
  // Compute isAdmin at token signing time for secure authorization
  const isAdmin = config.adminEmails.includes(payload.email.toLowerCase());

  return new SignJWT({
    email: payload.email,
    cid: payload.cid,
    productType,
    isAdmin,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    // Keep tokens short-lived for production safety (14 days max)
    .setExpirationTime("14d")
    .sign(getSecret());
}

/**
 * Verify and decode an access token
 * @param token - JWT token string
 * @returns Decoded payload
 * @throws Error if token is invalid or expired
 */
export async function verifyAccess(token: string): Promise<AccessTokenPayload> {
  const { payload } = await jwtVerify(token, getSecret());

  if (!payload.email || !payload.cid) {
    throw new Error("Invalid token payload");
  }

  const typed = payload as AccessTokenPayload;
  if (!typed.productType) {
    typed.productType = DEFAULT_PRODUCT;
  }

  return typed;
}
