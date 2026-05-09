import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin-login')) {
    const token = request.cookies.get('admin_token')?.value;
    const validToken = process.env.ADMIN_SECRET_TOKEN;

    if (!token || token !== validToken) {
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }
  }

  // Protect API routes
  if (request.nextUrl.pathname.startsWith('/api/products')) {
    const token = request.cookies.get('admin_token')?.value;
    const validToken = process.env.ADMIN_SECRET_TOKEN;

    // For POST/PUT/DELETE, verify token
    if (['POST', 'PUT', 'DELETE'].includes(request.method)) {
      if (!token || token !== validToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/products/:path*'],
};
