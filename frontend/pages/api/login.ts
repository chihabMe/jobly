import {
  accessTokenAge,
  loginEndpoint,
  refreshTokenAge,
} from "config/constances";
import { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";
import cookie from "cookie";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const { email, password } = req.body;
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };
    const response = await fetch(loginEndpoint, config);
    const data = await response.json();
    if (response.status == 200) {
      res.setHeader("Set-Cookie", [
        cookie.serialize("refresh", data.refresh, {
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.mode != "devMode",
          path: "/",
          maxAge: refreshTokenAge,
        }),
        cookie.serialize("authorization", data.access, {
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.mode != "devMode",
          path: "/",
          maxAge: accessTokenAge,
        }),
      ]);
    }

    return res.status(response.status).json(data);
  } else {
    return res
      .status(402)
      .json({ message: `method ${req.method} is not allowed` });
  }
};

export default login;
