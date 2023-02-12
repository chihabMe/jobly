import camelize from "camelize-ts";
import { userPasswordChangeEndpoint } from "config/constances";
import { NextApiRequest, NextApiResponse } from "next";
import generateAuthConfig from "src/libs/generateAuthConfig";

const profileChangePassword = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method == "POST") {
    const body = req.body;
    const config = generateAuthConfig(
      "POST",
      req.headers.cookie || "",
      JSON.stringify(body)
    );
    try {
      const response = await fetch(userPasswordChangeEndpoint, config);
      const data = camelize(await response.json());
      return res.status(response.status).json(data);
    } catch (err) {
      console.error(err);
      return res.status(403).json({ message: "bad request" });
    }
  } else {
    return res.status(405).json({ message: "this method is not allowed" });
  }
};
export default profileChangePassword;
