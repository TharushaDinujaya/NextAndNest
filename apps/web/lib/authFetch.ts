
import { getSession } from "./session";
import { refreshToken } from "./auth";

export interface FetchOptions extends RequestInit{
    headers?: Record<string, string>;
}

export const authFetch = async(url:string | URL, options: FetchOptions = {}) => {
    const session = await getSession();

    options.headers = {
        ...options.headers,
        Authorization: `Bearer ${session?.accessToken}`,
    }
    let response = await fetch(url, options);

    if(response.status == 401){
        if(!session?.refreshToken){
            throw new Error("No refresh token available");
        }

        const newAccessToken = await refreshToken(session.refreshToken);
        if(newAccessToken){
            options.headers.Authorization = `Bearer ${newAccessToken}`;
            response = await fetch(url, options);
        }
    }
    return response;
}