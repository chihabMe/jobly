import { API, currentUserEndpoint } from "config/constances";
import { NextApiRequest, NextApiResponse } from "next";
import httpProxyMiddleWare from "next-http-proxy-middleware";
import cookie from "cookie";

// const apiRoute = nextConnect({
//     onError(error,req:NextApiRequest,res:NextApiResponse){
//         res.status(501).json({error:`something went wrong ${error.message} `})
//     },
//     onNoMatch(req:NextApiRequest,res:NextApiResponse){
//         res.status(405).json({ error: `Method "${req.method}" Not Allowed` });
//     }
// })
// interface MulterRequest extends NextApiRequest{
//     files:any
// }
// apiRoute.use(multer().any())
// apiRoute.put((req:MulterRequest,res:NextApiResponse)=>{
//     return res.status(200).json({message:"good"})

// })
// export default apiRoute
export default (req: NextApiRequest, res: NextApiResponse) => {
  const access = cookie.parse(req.headers.cookie || "").access;
  httpProxyMiddleWare(req, res, {
    target: currentUserEndpoint,
    ignorePath: true,
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
};

export const config = {
  api: {
    bodyParser: false,
    // {
    //     sizeLimit: '100mb' // Set desired value here
    // }
  },
};
