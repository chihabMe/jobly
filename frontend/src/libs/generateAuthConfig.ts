import cookie from "cookie";
export default (method: string, cookies: string, body?: string) => {
  const access = cookie.parse(cookies || "").access;
  if (!access || access.length < 5)
    return {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  return {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
    body,
  };
};
