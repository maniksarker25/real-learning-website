import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Prevent user access to user-dashboard and organization-dashboard routes
  if (
    pathname.startsWith("/user-dashboard") ||
    pathname.startsWith("/organization-dashboard")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/user-dashboard/:path*",
    "/user-dashboard",
    "/organization-dashboard/:path*",
    "/organization-dashboard",
  ],
};
