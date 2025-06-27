import { authPaths } from "@/middleware";
import { NextRequest, NextResponse } from "next/server";

export function vendorMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;


  console.log("vendorMiddleware => ", pathname);
  // Allow vendor to access only vendor routes

  if(authPaths.includes(pathname)){
    return NextResponse.redirect(new URL("/dashboard", req.url));
  } 


  if (!pathname.startsWith("/vendor")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  } else {
    return NextResponse.next();
  }
}
