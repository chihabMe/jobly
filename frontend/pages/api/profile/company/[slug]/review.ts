import { NextApiRequest, NextApiResponse } from "next";
import generateAuthConfig from "src/libs/generateAuthConfig";
import { companyReviewEndpoint, companyReviewsEndpoint } from "config/config";

const CompanyReview = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
    const slug = req.query.slug;
    const config = generateAuthConfig("GET", req.headers.cookie || "");
    try {
      const response = await fetch(
        `${companyReviewEndpoint}${slug}/my-review/`,
        config
      );
      const data = await response.json();
      return res.status(response.status).json(data);
    } catch {
      return res.status(403).json({ message: "something went wrong" });
    }
  } else {
    res.status(405).json({ message: `method ${req.method} not allowed ` });
  }
};
export default CompanyReview;
