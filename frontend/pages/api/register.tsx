import { API, registrationsEndpoint } from "config";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req:NextApiRequest,res:NextApiResponse)=>{
    if(req.method=="POST"){
        const{username,email,password,re_password}= req.body
        const config = {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({username,email,password,re_password}),
        }
        const response = await fetch(registrationsEndpoint,config)
        const data = await response.json()
        return  res.status(response.status).json(data)
        

    }else{
        res.status(403).json({"message":`method ${req.method} is not allowed`})
    }

}