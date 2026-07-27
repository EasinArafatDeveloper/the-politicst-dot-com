import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req) {
  const url = req.nextUrl;
  
  if (
    url.pathname === '/admin' || 
    url.pathname.startsWith('/admin/') || 
    url.pathname.match(/^\/(en|bn)\/admin/)
  ) {
    // Auth is now handled in the layout.js to avoid URL redirects
    return intlMiddleware(req);
  }
  
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|uploads|favicon.ico).*)']
};
