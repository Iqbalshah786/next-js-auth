import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
  
  const path = request.nextUrl.pathname;

  const isPublicPath = path == '/login' || path == '/signup' ||  path == '/verifyemail' || path == '/resetpassword' || path == '/forgotpassword';

  const token = request.cookies.get('token')?.value || '';

  if(isPublicPath && token) {
    // If the user is logged in and tries to access login or signup, redirect to profile
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
  if(!isPublicPath && !token) {
    // If the user is not logged in and tries to access protected routes, redirect to login
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
  // If the user is logged in and accessing protected routes, allow the request to proceed
  return NextResponse.next();

}
 

export const config = {
  matcher: ['/', '/profile', '/login', '/signup','/verifyemail','/resetpassword', '/forgotpassword'],
}