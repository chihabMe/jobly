import { NextResponse } from "next/server";
import cookie from "cookie";
import { accessTokenAge, refreshTokenAge } from "config";
import { IncomingMessage, ServerResponse } from "http";

const setAuthCookies = ({
  access,
  refresh,
  res,
}: {
  access: string;
  refresh: string;
  res: ServerResponse<IncomingMessage>;
}) => {
  res.setHeader("Set-Cookie", [
    cookie.serialize("refresh", refresh, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.mode != "devMode",
      path: "/",
      maxAge: refreshTokenAge,
    }),
    cookie.serialize("access", access, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.mode != "devMode",
      path: "/",
      maxAge: accessTokenAge,
    }),
  ]);
};
export default setAuthCookies;
