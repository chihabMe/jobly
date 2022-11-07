import { currentUserEndpoint } from "config";
import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie';


const me =  async (req:NextApiRequest,res:NextApiResponse)=>{
    console.log(req.method)
    if(req.method=="GET"){
        let data ;
        const cookies = req.headers.cookie
        const access = cookie.parse(cookies||"").access
        try{
        const response = await fetch(currentUserEndpoint,{
            method:"GET",
            headers:{
                "Content-Type":"applications/json",
                "Authorization":`Bearer ${access}`
            }
        })
        data  = await response.json()
        if(response.status==200)return res.status(200).json(data)
        throw new Error(data)
        }catch{
        }
    return res.status(405).json(data)


    }else{
        return res.status(405).json({message:`method ${req.method} is not allowed `})
    }

}
export default me;