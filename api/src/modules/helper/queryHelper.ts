import { request } from "express";
import { generateRandomString, getDateTime, getIp } from ".";
import contprom from "../../modules/mysql";
import bcrypt from "bcryptjs";

export async function loginUser(username: string, password: string) {
  const [rows] = await contprom.query("SELECT * FROM users WHERE Username=?", [username]);
  const res = rows as any[];
  if (res.length == 0) return false;
  if (!bcrypt.compareSync(password, res[0].Password)) {
    return false;
  }
  delete res[0].Password;
  return res[0];
}

export async function createSession(userId: number, req: any) {
  let info = {
    UserId: userId,
    Ip: getIp(request),
    Date: getDateTime(),
    Token: generateRandomString(32),
  };
  const [rows] = await contprom.query("INSERT INTO sessions SET ?", [info]);
  const res = rows as any[];
  if (!res) return false;
  return info.Token;
}

export async function checkSession(token: number) {
  const [rows] = await contprom.query("SELECT * FROM sessions WHERE Token=?", [token]);
  const res = rows as any[];
  if (res.length == 0) return false;
  return res[0].UserId;
}

export async function getUserById(userId: number) {
  const [rows] = await contprom.query(
    "SELECT users.id, users.Username, users.FullName, ranks.Name as RankName, ranks.Permission, users.CreatedAt FROM users INNER JOIN ranks ON users.Rank = ranks.id WHERE users.id=?",
    [userId]
  );
  const res = rows as any[];
  if (res.length == 0) return false;
  return res[0];
}

export async function getStats() {
  const [guestRows] = await contprom.query("SELECT COUNT(*) as count FROM guests");
  const guests = guestRows as any[];
  const [roomRoows] = await contprom.query("SELECT COUNT(*) as count FROM rooms");
  const rooms = roomRoows as any[];
  const [reservationRoows] = await contprom.query("SELECT COUNT(*) as count FROM reservations");
  const reservations = reservationRoows as any[];

  return {
    guests: guests[0].count,
    rooms: rooms[0].count,
    reservations: reservations[0].count,
  };
}

export async function getGuestById(id: number) {
  const [rows] = await contprom.query("SELECT * FROM guests WHERE id=? AND Deleted=0", [id]);
  const res = rows as any[];
  if (res.length == 0) return false;
  return res[0];
}

export async function deleteGuest(id: number) {
  const [rows] = await contprom.query("SELECT * FROM reservations WHERE GuestId=?", [id]);
  const reservatios = rows as any[];
  if (reservatios.length == 0) {
    const [rows] = await contprom.query("UPDATE guests SET Deleted=1 WHERE id=?", [id]);
    return true;
  }
  return false;
}

export async function createGuest(fullName: string, email: string, birthDate: string, phone: string) {
  let info = {
    FullName: fullName,
    Email: email,
    BirthDate: birthDate,
    Phone: phone,
  };
  const [rows] = await contprom.query("INSERT INTO guests SET ?", [info]);
  const res = rows as any;
  if (!res.insertId) return false;
  return res.insertId;
}
