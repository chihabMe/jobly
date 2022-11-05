import cookie from 'cookie'
export default (method:string,cookies:string,body?:string) =>{
    const access = cookie.parse(cookies||"").access
    return {
        method,
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${access}`,
        },
        body

    }

}
