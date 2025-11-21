import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/lib/auth';

export async function proxy(request: NextRequest) {
    const session = request.cookies.get('session');
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/dashboard') && !session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if ((pathname === '/login' || pathname === '/register') && session) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return await updateSession(request);
}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/register'],
};
