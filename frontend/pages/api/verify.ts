import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { verifyEndpoint } from "config/constances";

const verifyApiRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies?.access;
    if (!access) return res.status(403).json({ message: "unauthorized" });
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: access }),
    };
    try {
      const response = await fetch(verifyEndpoint, config);

      const data = await response.json();
      return res.status(response.status).json(data);
    } catch {
      return res.status(405).json({ message: "bad request" });
    }
  } else {
    return res
      .status(400)
      .json({ message: `this method ${req.method} is not allowed` });
  }
};
export default verifyApiRoute;
