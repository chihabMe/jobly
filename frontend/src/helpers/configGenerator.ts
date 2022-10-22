import cookie from 'cookie'

export default (method:string,body:string|FormData,cookies:string,contentTpe:string="application/json")=>{
    const access = cookie.parse(cookies).access
    const config = {
        method,
        headers:{
            "Content-Type":contentTpe,
            "Authorization":`Bearer ${access}`
        },
        body
    }
    return config

}