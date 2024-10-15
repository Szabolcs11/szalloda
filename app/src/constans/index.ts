export const API_URL = import.meta.env.VITE_API_URL as string;

export const ENDPOINTS = {
  LOGIN: "/auth/login",
  AUTHENTICATE: "/auth/authenticate",
  DASHBOARD: "/dashboard",
  ROOM: "/room/",
  ROOMS: "/room",
  ADD_ROOM: "/room/add",
  DELETE_ROOM: "/room/delete",
  EDIT_ROOM: "/room/edit",
  ROOM_TYPES: "/roomtype/",
  GUESTS: "/guest",
  GUEST: "/guest/",
  DELETE_GUEST: "/guest/delete",
  ADD_GUEST: "/guest/add",
  ADD_RESERVATION: "/reservation/add",
  RESERVATIONS: "/reservation",
  RESERVATION: "/reservation/",
  DELETE_RESERVATION: "/reservation/delete",
  EDIT_RESERVATION: "/reservation/edit",
};

export const formatDateString = (date: string) => {
  const d = new Date(date);
  const fix = (n: number) => (n < 10 ? "0" + n : n);
  return `${d.getFullYear()}.${fix(d.getMonth() + 1)}.${fix(d.getDate())}.`;
};

export const formatDataForDatePicker = (date: string) => {
  const d = new Date(date);
  const fix = (n: number) => (n < 10 ? "0" + n : n);
  return `${d.getFullYear()}-${fix(d.getMonth() + 1)}-${fix(d.getDate())}`;
};
