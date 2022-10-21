import { verifyEndpoint } from "config";
import cookie from 'cookie';

export const verifyAuth = async (token: string) => {

    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token })
    };
    const response = await fetch(verifyEndpoint, config);
    const data = await response.json()
    return { status: response.status, data };
};
