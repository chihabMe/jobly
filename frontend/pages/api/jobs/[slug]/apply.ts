import camelize from "camelize-ts";
import { jobDetailEndpoint } from "config/constances";
import { NextApiRequest, NextApiResponse } from "next";
import generateAuthConfig from "src/libs/generateAuthConfig";

const JobApply = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const slug = req.query.slug;
    const config = generateAuthConfig("POST", req.headers.cookie || "");
    const response = await fetch(`${jobDetailEndpoint}${slug}/apply/`, config);
    const data = camelize(await response.json());
    return res.status(response.status).json(data);
  } else {
    return res
      .status(405)
      .json({ message: `method ${req.method} is not allowed` });
  }
};
export default JobApply;
