import { NextResponse } from "next/server";

/**
 * Logout route - clears access_token cookie
 */
export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete("access_token");
  return response;
}
