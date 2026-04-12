import { NextRequest, NextResponse } from 'next/server';
import { extractBearerToken, isPublicApiPath, isValidApiToken } from './lib/auth';

export function middleware(request: NextRequest) {
  if (isPublicApiPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const token = extractBearerToken(request.headers.get('authorization'));

  if (!isValidApiToken(token)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
