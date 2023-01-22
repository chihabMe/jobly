import { verifyEndpoint } from "config";

export const verifyAuth = async ({
  access,
}: {
  access: string | undefined;
}) => {
  if (!access) return false;
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: access }),
  };
  try {
    const response = await fetch(verifyEndpoint, config);
    return response.status == 200;
  } catch {
    return false;
  }
};
