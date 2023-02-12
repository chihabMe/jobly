import { jobSearchEndpoint } from "config/constances";
import { NextApiRequest, NextApiResponse } from "next";
import generateAuthConfig from "src/libs/generateAuthConfig";

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
    const config = generateAuthConfig("GET", "", req.headers.cookie || "");
    const response = await fetch(jobSearchEndpoint, config);
    const data = await response.json();
    return res.status(response.status).json(data);
  } else {
    return res
      .status(405)
      .json({ message: `method ${req.method} is not allowed` });
  }
};
export default search;
