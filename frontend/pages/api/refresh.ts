import { NextApiRequest, NextApiResponse } from "next";
import { refreshAuth } from "src/services/refreshAuth";
import cookie from "cookie";
import { accessTokenAge, refreshTokenAge } from "config";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const cookies = req.headers.cookie;
    if (!cookies) return res.status(403).json({ message: "unauthorized" });
    const refresh = cookie.parse(cookies).refresh;
    const response = await refreshAuth(refresh);
    if ((response.status = 200)) {
      const current = req.headers.cookie;
      res.setHeader(
        "Set-Cookie",[
        cookie.serialize("refresh", response.data.refresh, {
          httpOnly: true,
          path: "/",
          sameSite:"strict",
          secure:process.env.mode!='devMode',
          maxAge: refreshTokenAge,
        }),
        cookie.serialize("access", response.data.access, {
          httpOnly: true,
          path: "/",
          sameSite:"strict",
          secure:process.env.mode!='devMode',
          maxAge: accessTokenAge,
        })
        ]
      );
      return res.status(response.status).json({ message: "refreshed" });
    }
    return res.status(403).json({ message: "unAuthorized" });
  } else {
    return res
      .status(403)
      .json({ message: `method ${req.method} is not allowed` });
  }
};
