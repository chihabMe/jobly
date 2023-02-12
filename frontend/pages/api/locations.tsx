import { locationsEndpoint } from "config/constances";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
    try {
      const response = await fetch(locationsEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "applications/json",
        },
      });
      const locations = await response.json();
      if (response.status == 200) return res.status(200).json(locations);
      else throw new Error();
    } catch (err) {
      return res.status(405).json({ message: "something went wrong" });
    }
  } else {
    return res
      .status(405)
      .json({ message: `methdo ${req.method} is not allowed` });
  }
};
