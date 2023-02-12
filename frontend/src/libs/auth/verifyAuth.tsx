import { verifyEndpoint } from "config/constances";
import { IncomingMessage, ServerResponse } from "http";
import request from "src/services/request";
interface ReturnProps {
  valid: boolean;
  newTokens: {
    access: string;
    refresh: string;
  };
}
export const verifyAuth = async ({
  access,
  refresh,
  res,
}: {
  access: string | undefined;
  refresh: string | undefined;
  res?: ServerResponse<IncomingMessage>;
}) => {
  if (!access || !refresh) return { valid: false, newTokens: undefined };
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: access }),
  };
  try {
    // const response = await fetch(verifyEndpoint, config);
    const { status, newTokens } = await request({
      endpoint: verifyEndpoint,
      refresh,
      config,
    });
    return { valid: status == 200, newTokens };
  } catch {
    return { valid: false, newTokens: undefined };
  }
};
