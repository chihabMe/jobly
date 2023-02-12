import { companyReviewsEndpoint } from "config/constances";
import { NextApiRequest, NextApiResponse } from "next";
import generateAuthConfig from "src/libs/generateAuthConfig";

const CompanyReviews = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
    const slug = req.query.slug;
    const config = generateAuthConfig("GET", req.headers.cookie || "");
    try {
      const response = await fetch(`${companyReviewsEndpoint}${slug}/`, config);
      const data = await response.json();
      return res.status(response.status).json(data);
    } catch {
      return res.status(403).json({ message: "something went wrong" });
    }
  } else if (req.method == "PUT") {
    const slug = req.query.slug;
    const body = req.body;
    const config = generateAuthConfig("PUT", req.headers.cookie || "", body);
    try {
      const response = await fetch(`${companyReviewsEndpoint}${slug}/`, config);
      const data = await response.json();
      return res.status(response.status).json(data);
    } catch {
      return res.status(403).json({ message: "something went wrong" });
    }
  } else {
    res.status(405).json({ message: `method ${req.method} not allowed ` });
  }
};
export default CompanyReviews;
