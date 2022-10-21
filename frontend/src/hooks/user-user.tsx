import { useEffect } from "react"
import UseFetch from "./use-fetch"

const userUser = ()=>{
    const {data:user,error,isLoading,request,status} = UseFetch()
    useEffect(()=>{
    console.log("run")
        const r = request("GET","/api/me","")
        console.log(r)
    },[])

    return {user,error,isLoading,status}

}
export default userUser