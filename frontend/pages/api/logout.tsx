import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie';
import { accessTokenAge, refreshTokenAge } from "config";

export default (req: NextApiRequest, res: NextApiResponse) => {

    res.setHeader("Set-Cookie", [
        cookie.serialize("refresh", "", {
            httpOnly: true,
            expires: new Date(0),
            sameSite: "strict",
            secure: process.env.mode != 'devMode',
            path: "/",
            maxAge: refreshTokenAge,
        }),
        cookie.serialize("access", "", {
            httpOnly: true,
            expires: new Date(0),
            sameSite: "strict",
            secure: process.env.mode != 'devMode',
            path: "/",
            maxAge: accessTokenAge,
        }),
    ]);

    return res.status(200).json({ message: "logged out" })
    return

}