import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import cookie from "cookie";

// export function middleware(req: NextRequest) {
//   console.log("run middleware");
//   const cookies = req.cookies;
//   console.log(cookies);
//   //   const access = cookie.parse(cookies || "").access;
//   return NextResponse.next();
// }
export const config = {
  matcher: ["/"],
};
