import { NextResponse, NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect unauthenticated users from protected routes
  const isAuthenticated = request.cookies.get("admin-token");

  if (pathname.startsWith("/admin") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Add security headers to all other responses
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'"
  );

  return response;
}

export const config = {
  matcher: ["/admin/post/:path*", "/admin", "/api/post/:path*"],
};
