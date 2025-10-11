'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Server Action: Log out user by clearing JWT cookie
 */
export async function logoutUser() {
  // Clear the JWT cookie (httpOnly)
  (await cookies()).delete('access_token');

  // Redirect to home page after logout
  redirect('/');
}
