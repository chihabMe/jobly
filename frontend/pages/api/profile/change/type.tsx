import camelize from "camelize-ts";
import { userTypeChangeEndpoint } from "config";
import { NextApiRequest, NextApiResponse } from "next";
import generateAuthConfig from "src/libs/generateAuthConfig";

const profileChangeType = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const body = req.body;
    const config = generateAuthConfig(
      "POST",
      req.headers.cookie || "",
      JSON.stringify(body)
    );
    const response = await fetch(userTypeChangeEndpoint, config);
    const data = camelize(await response.json());
    return res.status(response.status).json(data);
  } else {
    return res.status(405).json({ message: "this method is not allowed" });
  }
};
export default profileChangeType;
