import { NextApiRequest, NextApiResponse } from "next";
import { refreshAuth } from "src/services/refreshAuth";
import cookie from "cookie";
import { accessTokenAge, API, refreshTokenAge } from "config/constances";

const refreshApiRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const cookies = req.headers.cookie;
    if (!cookies) return res.status(403).json({ message: "unauthorized" });
    const refresh = cookie.parse(cookies).refresh;
    const response = await refreshAuth(refresh);
    if (response.status == 200 && response.data.code != "token_not_valid") {
      const current = req.headers.cookie;
      res.setHeader("Set-Cookie", [
        cookie.serialize("refresh", response.data.refresh, {
          httpOnly: true,
          path: API,
          sameSite: "strict",
          secure: process.env.mode != "devMode",
          maxAge: refreshTokenAge,
        }),
        cookie.serialize("Authorization", response.data.access, {
          httpOnly: true,
          path: API,
          sameSite: "strict",
          secure: process.env.mode != "devMode",
          maxAge: accessTokenAge,
        }),
      ]);
      return res.status(response.status).json({ message: "refreshed" });
    }
    return res.status(403).json({ message: "unAuthorized" });
  } else {
    return res
      .status(403)
      .json({ message: `method ${req.method} is not allowed` });
  }
};

export default refreshApiRoute;
