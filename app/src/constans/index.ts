export const API_URL = import.meta.env.VITE_API_URL as string;

export const ENDPOINTS = {
  LOGIN: "/auth/login",
  AUTHENTICATE: "/auth/authenticate",
  DASHBOARD: "/dashboard",
  ROOMS: "/room",
  ADD_ROOM: "/room/add",
  DELETE_ROOM: "/room/delete",
  ROOM_TYPES: "/roomtype/",
  GUESTS: "/guest",
  ADD_GUEST: "/guest/add",
  ADD_RESERVATION: "/reservation/add",
};
