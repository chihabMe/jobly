import { IncomingMessage, ServerResponse } from "http";
// import { NextApiResponse, NextPageContext } from "next";
import { NextResponse } from "next/server";
import generateAuthConfig from "src/libs/generateAuthConfig";
import setAuthCookies from "src/libs/setAuthCookies";
import { refreshAuth } from "./refreshAuth";

const request = async ({
  endpoint,
  config,
  refresh,
  res,
}: {
  endpoint: string;
  config: any;
  refresh: string;
  res?: ServerResponse<IncomingMessage>;
}) => {
  console.log("refresh=>", refresh);
  let response = await fetch(endpoint, config);
  let newTokens: { access: string; refresh: string } | undefined;

  if (!response.ok) {
    const { data, status } = await refreshAuth(refresh);
    newTokens = data;

    console.log("refreshed");
    console.log(status);
    console.log(newTokens);
    console.log("refreshed");
    if (status == 200 && newTokens) {
      console.log("step 1 ");
      if (res && newTokens)
        setAuthCookies({
          access: newTokens?.access,
          refresh: newTokens?.refresh,
          res,
        });
      if (newTokens) {
        console.log("step 2");
        config.headers["Authorization"] = `bearer ${newTokens.access}`;
        response = await fetch(endpoint, config);
        console.log(newTokens.access);
        console.log(response.status);
        console.log(response.statusText);
      }
    } else {
      console.log("step 3");
      delete config.headers["Authorization"];
      response = await fetch(endpoint, config);
    }
  }
  const data = await response.json();
  return { status: response.status, data, newTokens };
};
export default request;
