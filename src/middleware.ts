import { NextRequest, NextResponse } from "next/server";

export const authPaths = ["/login", "/signup"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("V_at")?.value;
  const role = JSON.parse(req.cookies.get("V_PL")?.value || "{}")?.role;
  const haveStore = req.cookies.get("h_s")?.value;
  const isSubscribed = req.cookies.get("s_s")?.value;

  const { pathname } = req.nextUrl;

  console.log("middleware step 1 => ", isSubscribed, pathname);

  // Helper to attach header to all responses
  const withNoCache = (res: NextResponse) => {
    res.headers.set("x-middleware-cache", "no-cache");
    return res;
  };

  // If the user is not logged in, restrict access to specific routes
  if (pathname === "/") {
    return withNoCache(NextResponse.redirect(new URL("/login", req.url)));
  }

  if (!token) {
    if (authPaths.includes(pathname)) {
      return withNoCache(NextResponse.next());
    }
    return withNoCache(NextResponse.redirect(new URL("/login", req.url)));
  }

  if (role === "vendor" && token) {
    if (!haveStore && pathname !== "/store/create/internal-store") {
      return withNoCache(
        NextResponse.redirect(new URL("/store/create/internal-store", req.url))
      );
    }
    if (isSubscribed == "true" && pathname == "/affiliate/subscription") {
      return withNoCache(NextResponse.redirect(new URL("/affiliate/programs", req.url)));
    }
    if (isSubscribed == "false" && pathname == "/affiliate/programs") {
      return withNoCache(NextResponse.redirect(new URL("/affiliate/subscription", req.url)));
    }
    if (authPaths.includes(pathname)) {
      return withNoCache(NextResponse.redirect(new URL("/dashboard", req.url)));
    }
    return withNoCache(NextResponse.next());
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.webp|.*\\.ico).*)',
    "/firebase-messaging-sw.js"
  ],
};
