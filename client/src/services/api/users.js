import { api } from "./apiConfig";
import jwtDecode from "jwt-decode";

export const signUp = async (credentials) => {
  try {
    const res = await api.post("/sign-up", credentials);
    localStorage.setItem("token", res.data.token);
    const user = jwtDecode(res.data.token);
    return user;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (credentials) => {
  try {
    const res = await api.post("/sign-in", credentials);
    localStorage.setItem("token", res.data.token);
    const user = jwtDecode(res.data.token);
    return user;
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    localStorage.removeItem("token");
    return true;
  } catch (error) {
    throw error;
  }
}; // missing endpoint

export const verify = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const res = await api.get("/verify");
    return res.data;
  }
  return false;
};
