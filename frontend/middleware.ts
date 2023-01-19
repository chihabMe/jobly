import { NextMiddleware, NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import cookie from "cookie";
import { verifyAuth } from "src/libs/auth/verifyAuth";

export async function middleware(req: NextRequest) {
  const access = req.cookies.get("access");
  const verify = await verifyAuth({ access });
  if (!verify) return NextResponse.redirect(new URL("/login", req.url));
  return NextResponse.next();
}
export const config = {
  matcher: ["/profile", "/profile/edit", "/settings"],
};
