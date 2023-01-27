import { NextApiRequest, NextApiResponse } from "next";
import generateAuthConfig from "src/libs/generateAuthConfig";
import cookie from "cookie";
import request from "../../../../../src/services/request";
import { companyEndpoint } from "config/config";

const CompanyJobs = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
    const { slug } = req.query;
    const { access, refresh } = cookie.parse(req.headers.cookie || "");
    const config = generateAuthConfig("GET", access);
    const endpoint = companyEndpoint + slug + "/jobs/";
    try {
      const { data, status } = await request({
        config,
        endpoint,
        refresh,
        res,
      });
      return res.status(status).json(data);
    } catch {
      return res.status(401).json({ msg: "something went wrong" });
    }
  } else {
    return res.status(403).json({ msg: `method ${req.method} not allowed` });
  }
};
export default CompanyJobs;
