import { useState } from "react";

const UseFetch = () => {
    const [status, setStatus] = useState<number>()
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<any>("")
    const [isLoading, setIsLoading] = useState(false)

    const request = async (method: string, url: string, body?: string|FormData,contentType:null|string="application/json") => {
        setError("");
        setStatus(0);
        setIsLoading(true);
        let response;
        const config:{method:string,headers?:any,body:string|FormData|undefined} = {
                method,
                body,
        } 
        if(contentType)config.headers = {
            "Content-Type":contentType
        }
        try {
            response = await fetch(url, config)

            const resData = await response.json();
            setData(resData)
            if (!response.ok) {
                setError(resData)
                throw new Error(resData)
            }
        } catch (error) {
        }
        setIsLoading(false)
        setStatus(response?.status)

    }
    return { request, data, status, isLoading, error }


}
export default UseFetch;