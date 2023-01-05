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
    if (status == 200) {
      config.headers["Authorization"] = `bearer ${data.access}`;
      if (res && data)
        setAuthCookies({ access: data.access, refresh: data.refresh, res });
    }
    delete config.headers["Authorization"];
    response = await fetch(endpoint, config);
  }
  const data = await response.json();
  return { status: response.status, data, newTokens };
};
export default request;
