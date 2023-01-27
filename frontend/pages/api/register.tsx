import { API, registrationsEndpoint } from "config/config";
import { NextApiRequest, NextApiResponse } from "next";

const registerApiRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const { username, email, password, re_password, account_type } = req.body;
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        re_password,
        account_type,
      }),
    };
    const response = await fetch(registrationsEndpoint, config);
    const data = await response.json();
    return res.status(response.status).json(data);
  } else {
    res.status(403).json({ message: `method ${req.method} is not allowed` });
  }
};
export default registerApiRoute;
