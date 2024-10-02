export const API_URL = import.meta.env.VITE_API_URL as string;

export const ENDPOINTS = {
  LOGIN: API_URL + "auth/login",
  AUTHENTICATE: API_URL + "auth/authenticate",
};
