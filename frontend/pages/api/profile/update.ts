import { currentUserEndpoint } from "config";
import { NextApiRequest, NextApiResponse } from "next";
import configGenerator from "src/helpers/configGenerator";
import nextConnect from 'next-connect'
import multer from "multer"
import  formidable from 'formidable'


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

export default async(req:NextApiRequest,res:NextApiResponse)=>{
    console.log("run profile update")
    console.log(req.method)
    
    if(req.method=="PUT"){
        const cookies = req.headers.cookie||""
        const body = new FormData() 
        const form = new formidable.IncomingForm();
        form.uploadDir = "./";
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {

            console.log("------------------------")
            console.log(files)
            console.log(files.cv)
             body.set("name",fields?.name)
             body.set("cv",files?.cv)
            console.log(body)
            console.log("------------------------")

        });

        const contentType  = "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW" 
        const config = configGenerator("PUT",body,cookies,contentType)
        const response = await  fetch(currentUserEndpoint,config)
        const data = await response.json()
        return res.status(response.status).json(data)

    }else{
        res.status(405).json({message:`method ${req.method} is not allowed`})
    }
}

export const config = {
    api: {
        bodyParser: false
        // {
        //     sizeLimit: '100mb' // Set desired value here
        // }
    }
}