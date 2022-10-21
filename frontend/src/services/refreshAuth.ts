

import { refreshEndpoint } from "config";

export const refreshAuth = async (refresh: string) => {

    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh })
    };
    const response = await fetch(refreshEndpoint, config);
    const data = await response.json()
    return { status: response.status, isAuthenticated: true, data };
};
