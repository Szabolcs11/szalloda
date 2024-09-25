import { Request } from "express";

export function getIp(req: Request) {
  return req.headers["x-forwarded-for"];
}

export function getDate() {
  var today = new Date();
  return today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
}
