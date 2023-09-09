import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  if (url.pathname.startsWith('/_next')) return NextResponse.next();

  // 暫定対応として、スマホの場合、QRコードからページ遷移は認証不要にしておく
  // if (!req.cookies.get('accessToken')) {
  //   url.pathname = '/login';
  //   return NextResponse.rewrite(url);
  // }

  return NextResponse.next();
}
