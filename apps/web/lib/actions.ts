"use server";

import { authFetch } from "./authFetch";
import { BACKEND_URL } from "./constants";
import { getSession } from "./session";


export const getProfile = async () =>{
    // here we use alternative 
    // const session = await getSession();
    // const response = await fetch(`${BACKEND_URL}/auth/protected`, {
    //     headers: {
    //         'Authorization': `Bearer ${session?.accessToken}`
    //     }
    // });

    const response = await authFetch(`${BACKEND_URL}/auth/protected`);
    const result = await response.json();
    return result;
}
