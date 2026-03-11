import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isHomePage = pathname === "/";
  const isLoginPage = pathname === "/login";
  const authCookie = request.cookies.get("elev8-recruitment-auth")?.value;
  const isAuthenticated = authCookie === process.env.SESSION_TOKEN;

  // Home page (hero intro) is always public
  if (isHomePage) {
    return NextResponse.next();
  }

  // If on login page and already authenticated, go to dashboard
  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Protected pages: redirect to login if not authenticated
  if (!isLoginPage && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
