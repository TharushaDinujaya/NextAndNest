"use server";
import { authFetch } from "./authFetch";
import { BACKEND_URL } from "./constants";

export const getProfile = async () => {
  const response = await authFetch(`${BACKEND_URL}/auth/protected`);

  console.log(response);
  const result = await response.json();
  return result;
};