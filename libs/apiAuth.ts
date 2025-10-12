/*
  API authentication utilities for route handlers
*/

import "server-only";
import { cookies } from "next/headers";
import { verifyAccess } from "./jwt";
import { isAdmin } from "./authz";

/**
 * Verify admin access for API routes
 * @returns Admin email if valid, otherwise throws
 */
export async function requireAdminApi(): Promise<string> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  if (!token) {
    throw new Error("Nicht authentifiziert");
  }

  let email: string;
  try {
    const payload = await verifyAccess(token.value);
    email = payload.email;
  } catch {
    throw new Error("Ungültiges Token");
  }

  if (!isAdmin(email)) {
    throw new Error("Keine Admin-Berechtigung");
  }

  return email;
}
