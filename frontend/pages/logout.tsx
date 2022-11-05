import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const logout = () => {
    const router = useRouter()
    useEffect(()=>{
         fetch("/api/logout").then().then(()=>{
                router.push("/login")
         })
    },[])
    return <></>
}

export default logout