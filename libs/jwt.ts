import { SignJWT, jwtVerify, type JWTPayload } from "jose";

export interface AccessTokenPayload extends JWTPayload {
  email: string;
  cid: string; // Stripe customer ID
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
}): Promise<string> {
  return new SignJWT({ email: payload.email, cid: payload.cid })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("365d")
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

  return payload as AccessTokenPayload;
}
