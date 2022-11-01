import React from 'react'
import { useSelector } from 'react-redux'
import HeaderNonAuthUserDisplay from './HeaderNonAuthUserDisplay'
import HeaderProfileDisplay from './HeaderProfileDisplay'

const HeaderAuthDisplay = () => {
    const {isLogged,user} = useSelector(state=>state.auth)
    if(isLogged)return <HeaderProfileDisplay user={user}/>
    return <HeaderNonAuthUserDisplay/>


}

export default HeaderAuthDisplay