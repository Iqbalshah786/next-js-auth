import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value || '';

  // Define different types of paths
  const isAuthPath = path === '/login' || path === '/signup';
  
  const isProtectedPath = path.startsWith('/profile');

  // If user is logged in and tries to access login/signup, redirect to profile
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL('/profile', request.nextUrl));
  }

  // If user is not logged in and tries to access protected routes, redirect to login
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // Allow access to public paths and auth paths without restrictions
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/profile/:path*',
    '/login', 
    '/signup',
    '/verifyemail',
    '/resetpassword', 
    '/forgotpassword'
  ],
}