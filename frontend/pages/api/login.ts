import { accessTokenAge, loginEndpoint, refreshTokenAge } from "config";
import { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";
import cookie from "cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
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
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("refresh", data.refresh, {
          httpOnly: true,
          path: "/",
          maxAge: refreshTokenAge,
        }),
        cookie.serialize("access", data.access, {
          httpOnly: true,
          path: "/",
          maxAge: accessTokenAge,
        })
      );
    }

    return res.status(response.status).json(data);
  } else {
    return res
      .status(402)
      .json({ message: `method ${req.method} is not allowed` });
  }
};
