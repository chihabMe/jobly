import { API, currentUserEndpoint } from "config";
import { NextApiRequest, NextApiResponse } from "next";
import configGenerator from "src/helpers/configGenerator";
import nextConnect from 'next-connect'
import multer from "multer"
import  formidable from 'formidable'
import httpProxyMiddleWare from 'next-http-proxy-middleware'
import cookie from 'cookie';



// const apiRoute = nextConnect({
//     onError(error,req:NextApiRequest,res:NextApiResponse){
//         console.log(error)
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
//     console.log(req.files)
//     console.log("--------")
//     console.log(req.body)
//     return res.status(200).json({message:"good"})

// })
// export default apiRoute
export default (req:NextApiRequest,res:NextApiResponse)=>{
    const access = cookie.parse(req.headers.cookie||"").access
    httpProxyMiddleWare(req,res,{
        target:currentUserEndpoint,
        ignorePath:true,
        headers:{
            "Authorization":`Bearer ${access}`
        }
    })

}


export const config = {
    api: {
        bodyParser: false
        // {
        //     sizeLimit: '100mb' // Set desired value here
        // }
    }
}