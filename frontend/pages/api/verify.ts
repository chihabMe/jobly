import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie';
import { verifyAuth } from "src/services/verifyAuth";

export default async (req:NextApiRequest,res:NextApiResponse) =>{
    if(req.method=="POST"){
        const cookies = req.headers.cookie;
        if(!cookies)return res.status(403).json({message:"unauthorized"})
        const access = cookie.parse(cookies).access
        const response =  await verifyAuth(access);
        return res.status(response.status).json(response)

    }else{
        return res.status(400).json({"message":`this method ${req.method} is not allowed`})
    }
}