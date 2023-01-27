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
  let response = await fetch(endpoint, config);
  let newTokens: { access: string; refresh: string } | undefined;

  if (!response.ok) {
    const { data, status } = await refreshAuth(refresh);
    newTokens = data;

    if (status == 200 && newTokens) {
      if (res && newTokens)
        setAuthCookies({
          access: newTokens?.access,
          refresh: newTokens?.refresh,
          res,
        });
      if (newTokens) {
        config.headers["Authorization"] = `Bearer ${newTokens.access}`;
        response = await fetch(endpoint, config);
      }
    } else {
      delete config.headers["Authorization"];
      response = await fetch(endpoint, config);
    }
  }
  const data = await response.json();
  return { status: response.status, data, newTokens };
};
export default request;
