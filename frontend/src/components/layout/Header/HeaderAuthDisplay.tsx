import React from 'react'
import { useSelector } from 'react-redux'
import HeaderNonAuthUserDisplay from './HeaderNonAuthUserDisplay'
import HeaderProfileDisplay from './HeaderProfileDisplay'

const HeaderAuthDisplay = () => {
    const {isLogged,user,isLoading} = useSelector(state=>state.auth)
    if(!isLoading&&isLogged)return <HeaderProfileDisplay user={user}/>
    else if(!isLoading && !isLogged)return <HeaderNonAuthUserDisplay/>
    return <></>


}

export default HeaderAuthDisplay