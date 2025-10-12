/*
  Authorization utilities for admin features

  isAdmin() checks if an email is in the adminEmails list from config
*/

import "server-only";
import config from "@/config";

/**
 * Check if the given email is an admin
 * @param email - Email address to check
 * @returns true if email is in config.adminEmails
 */
export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return config.adminEmails.includes(email.toLowerCase());
}
