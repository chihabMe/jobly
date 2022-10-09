import { verify } from 'crypto';
import React, { ReactNode, useContext, useEffect } from 'react'
import PageIsLoading from 'src/components/ui/PageIsLoading';
import { AuthContext } from 'src/context/AuthContext'
import {useRouter} from 'next/router'

const ProtectedRoute = ({children}:{children:ReactNode}) => {
    const router = useRouter();
    const {isAuthenticated,verify,isLoading}= useContext(AuthContext);
    useEffect(()=>{
        verify()
    },[])
    if(isLoading)return <PageIsLoading/>
    if(!isLoading && !isAuthenticated) {
        router.push(("/login"));
        return ;
    }
    return children
}

export default ProtectedRoute