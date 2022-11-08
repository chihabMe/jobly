import React from 'react'
import { useSelector } from 'react-redux'
import useAppSelector from 'src/hooks/useAppSelector'
import HeaderNonAuthUserDisplay from './HeaderNonAuthUserDisplay'
import HeaderProfileDisplay from './HeaderProfileDisplay'

const HeaderAuthDisplay = () => {
    const {isLogged,user,isLoading} = useAppSelector(state=>state.auth)
    if(!isLoading&&isLogged&&user)return <HeaderProfileDisplay user={user}/>
    else if(!isLoading && !isLogged)return <HeaderNonAuthUserDisplay/>
    return <></>


}

export default HeaderAuthDisplay