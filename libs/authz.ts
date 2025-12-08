/*
  Authorization utilities for admin features

  isAdmin() checks if an email is in the adminEmails list from config
  isAdminFromToken() checks the JWT isAdmin claim for secure authorization
*/

import "server-only";
import config from "@/config";
import type { AccessTokenPayload } from "@/libs/jwt";

/**
 * Check if the given email is an admin (fallback check)
 * @param email - Email address to check
 * @returns true if email is in config.adminEmails
 */
export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return config.adminEmails.includes(email.toLowerCase());
}

/**
 * Check admin status from JWT payload (preferred method)
 * Uses the signed isAdmin claim when available, falls back to email check
 * @param payload - Verified JWT payload
 * @returns true if user is admin
 */
export function isAdminFromToken(payload: AccessTokenPayload): boolean {
  // Prefer the signed claim if present
  if (typeof payload.isAdmin === "boolean") {
    return payload.isAdmin;
  }
  // Fallback for tokens issued before this change
  return isAdmin(payload.email);
}
