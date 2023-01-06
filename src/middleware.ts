// middleware.ts

import { BACKEND_URL } from 'lib/pb';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const renewAuth = async (auth: string) => {
  return await fetch(
    `https://billowing-hill-1662.fly.dev/api/collections/users/auth-refresh`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth}`,
      },
    }
  );
};

export async function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);
  if (pathname.startsWith('/account')) {
    // Check the Authorization header or cookie
    const auth =
      request.headers.get('Authorization') ||
      request.cookies.get('pb_auth')?.value;
    if (!auth) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // Check if the auth is valid
    const authResponse = await renewAuth(JSON.parse(auth).token);

    if (authResponse.status !== 200) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (authResponse.status === 200) {
      const auth = await authResponse.json();
      request.headers.set('Authorization', `Bearer ${auth.token}`);
      request.cookies.set('pb_auth', JSON.stringify(auth));
    }
  }
  return NextResponse.next();
}
