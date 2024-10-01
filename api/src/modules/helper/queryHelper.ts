import { request } from "express";
import { generateRandomString, getDateTime, getIp } from ".";
import contprom from "../../modules/mysql";
import bcrypt from "bcryptjs";

export async function loginUser(username: string, password: string) {
  const [res] = await (await contprom).query("SELECT * FROM users WHERE Username=?", [username]);
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
  const [res] = await (await contprom).query("INSERT INTO sessions SET ?", [info]);
  if (!res) return false;
  return info.Token;
}

export async function checkSession(token: number) {
  const [res] = await (await contprom).query("SELECT * FROM sessions WHERE Token=?", [token]);
  if (res.length == 0) return false;
  return res[0].UserId;
}

export async function getUserById(userId: number) {
  const [res] = await (
    await contprom
  ).query(
    "SELECT users.id, users.Username, users.FullName, ranks.Name as RankName, ranks.Permission, users.CreatedAt FROM users INNER JOIN ranks ON users.Rank = ranks.id WHERE users.id=?",
    [userId]
  );
  if (res.length == 0) return false;
  return res[0];
}

export async function getStats() {
  const [guests] = await (await contprom).query("SELECT COUNT(*) as count FROM guests");
  const [rooms] = await (await contprom).query("SELECT COUNT(*) as count FROM rooms");
  const [reservations] = await (await contprom).query("SELECT COUNT(*) as count FROM reservations");

  return {
    guests: guests[0].count,
    rooms: rooms[0].count,
    reservations: reservations[0].count,
  };
}

export async function getGuestById(id: number) {
  const [res] = await (await contprom).query("SELECT * FROM guests WHERE id=? AND Deleted=0", [id]);
  if (res.length == 0) return false;
  return res[0];
}

export async function deleteGuest(id: number) {
  const [res] = await (await contprom).query("UPDATE guests SET Deleted=1 WHERE id=?", [id]);
  if (res.affectedRows == 0) return false;
  return true;
}

export async function createGuest(fullName: string, email: string, birthDate: string, phone: string) {
  let info = {
    FullName: fullName,
    Email: email,
    BirthDate: birthDate,
    Phone: phone,
  };
  const [res] = await (await contprom).query("INSERT INTO guests SET ?", [info]);
  if (!res.insertId) return false;
  return res.insertId;
}
