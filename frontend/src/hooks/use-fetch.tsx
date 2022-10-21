import { useState } from "react";


const UseFetch = () => {
    const [status, setStatus] = useState<number>()
    const [data, setData] = useState("")
    const [error, setError] = useState<any>("")
    const [isLoading, setIsLoading] = useState(false)

    const request = async (method: string, url: string, body: string) => {
        setError("");
        setStatus(0);
        setIsLoading(true);
        let response;
        try {
            response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body,
            })

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