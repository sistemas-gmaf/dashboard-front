import { NextResponse } from "next/server";

export function middleware(req) {
  const sessionCookie = req.cookies.get("connect.sid")?.value;
  const url = req.nextUrl.clone();

  if (url.pathname === '/' && sessionCookie !== undefined) {
    url.pathname = '/dashboard/inicio';
    return NextResponse.redirect(url);
  }
 
  if (url.pathname.startsWith('/dashboard') && sessionCookie === undefined) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    url.searchParams.append('alert', 'La sesión expiró');
    return NextResponse.redirect(url);
  }
}