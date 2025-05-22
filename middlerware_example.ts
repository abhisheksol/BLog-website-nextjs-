// middleware.js
import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/jwt";

export function middleware(request) {
  const token = request.cookies.get("token")?.value || request.headers.get("authorization")?.replace("Bearer ", "");

  const valid = verifyJwt(token);
  if (!valid) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
