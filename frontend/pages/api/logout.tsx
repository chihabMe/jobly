import { NextApiRequest, NextApiResponse } from "next"

export default (req:NextApiRequest,res:NextApiResponse)=>{
    res.removeHeader("Cookie")
    return res.status(200).json({message:"logged out"})
    return 

}