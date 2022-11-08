import cookie from "cookie";
export default (method: string, cookies: string, body?: string) => {
  const access = cookie.parse(cookies || "").access;
  const config:Config =  {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body,
  };

  if (access && access.length > 10)config.headers.Authorization= `Bearer ${access}`
  return config;
};

interface Config {
    method:string,
    headers:{
        "Content-Type":string,
        "Authorization"?:string
    },
    body:string | FormData|undefined
}