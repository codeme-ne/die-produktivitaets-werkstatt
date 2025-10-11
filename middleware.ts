import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAccess } from '@/libs/jwt';

/**
 * Middleware to protect /course routes with JWT authentication
 * Checks for access_token cookie and redirects to home if invalid
 */
export async function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;
  
  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  
  try {
    await verifyAccess(token);
    return NextResponse.next();
  } catch (error) {
    // Invalid or expired token - clear cookie and redirect
    const response = NextResponse.redirect(new URL('/', req.url));
    response.cookies.delete('access_token');
    return response;
  }
}

export const config = {
  matcher: ['/course/:path*', '/dashboard'],
};
