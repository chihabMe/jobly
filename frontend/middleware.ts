import { NextMiddleware, NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import cookie from "cookie";
import { verifyAuth } from "src/libs/auth/verifyAuth";
import { ServerResponse } from "http";
import { URL } from "url";

export async function middleware(req: NextRequest, res: NextResponse) {
  // const access = req.cookies.get("access");
  // const refresh = req.cookies.get("refresh");
  // console.log("access", access);
  // console.log("refresh", refresh);
  // const { valid, newTokens } = await verifyAuth({
  //   access,
  //   refresh,
  // });
  // console.log(valid, newTokens);
  // const url = req.nextUrl.clone();
  // url.pathname = "/login";
  // if (!valid) return NextResponse.redirect(url);
  const response = NextResponse.next();
  // if (newTokens) {
  //   response.cookies.set("access", newTokens.access);
  //   response.cookies.set("refresh", newTokens.refresh);
  // }
  return response;
}
export const config = {
  matcher: ["/profile", "/profile/edit", "/settings"],
};
