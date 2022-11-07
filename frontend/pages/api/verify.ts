import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie';
import { verifyAuth } from "src/services/verifyAuth";

const verifyApiRoute =  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "POST") {
        const cookies = cookie.parse(req.headers.cookie ?? "");
        const access = cookies?.access
        if (!access) return res.status(403).json({ message: "unauthorized" })
        const response = await verifyAuth(access);
        return res.status(response.status).json(response)

    } else {
        return res.status(400).json({ "message": `this method ${req.method} is not allowed` })
    }
}
export default verifyApiRoute;