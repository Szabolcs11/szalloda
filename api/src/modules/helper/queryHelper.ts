import bcrypt from "bcryptjs";
import { request } from "express";
import { generateRandomString, getDateTime, getIp } from ".";
import contprom from "../../modules/mysql";

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
  const [rows] = await contprom.query(`
    SELECT 
      (SELECT COUNT(*) FROM guests) AS guestCount,
      (SELECT COUNT(*) FROM rooms) AS roomCount,
      (SELECT COUNT(*) FROM reservations) AS reservationCount
  `);

  const res = rows as any[];
  const guestCount = res[0].guestCount;
  const roomCount = res[0].roomCount;
  const reservationCount = res[0].reservationCount;

  const [roomtypeStatsRows] = await contprom.query(
    "SELECT rt.Name AS RoomType, COUNT(r.id) AS ReservationCount, AVG(r.Price) AS AveragePrice FROM reservations r JOIN rooms rm ON r.RoomID = rm.id JOIN room_type rt ON rm.RoomType = rt.id GROUP BY rt.Name;"
  );
  const roomtypeStats = roomtypeStatsRows as any[];

  return {
    guests: guestCount,
    rooms: roomCount,
    reservations: reservationCount,
    roomtypeStats,
  };
}

export async function getGuestById(id: number) {
  const [rows] = await contprom.query("SELECT * FROM guests WHERE id=? AND Deleted=0", [id]);
  const res = rows as any[];
  if (res.length == 0) return false;
  const [reservations] = await contprom.query(
    "SELECT reservations.id as ReservationId, reservations.RoomId, reservations.StartDate, reservations.EndDate, reservations.Price, rooms.RoomNumber, room_type.Name as RoomTypeName, room_type.NumberOfBeds, room_type.Description, room_type.DailyPrice FROM reservations INNER JOIN rooms ON rooms.id = reservations.RoomID INNER JOIN room_type ON room_type.id = rooms.RoomType WHERE reservations.GuestID = ?;",
    [id]
  );
  res[0].Reservations = reservations;
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

export async function getGuests() {
  const [rows] = await contprom.query("SELECT * FROM guests WHERE Deleted=0");
  const res = rows as any[];
  await Promise.all(
    res.map(async (guest) => {
      const [rows] = await contprom.query(
        "SELECT reservations.id as ReservationId, reservations.GuestId, reservations.RoomId, reservations.StartDate, reservations.EndDate, reservations.Price, guests.id as GuestId, rooms.RoomNumber, room_type.Name as RoomTypeName, room_type.NumberOfBeds, room_type.Description, room_type.DailyPrice FROM reservations INNER JOIN guests ON reservations.GuestId = guests.id INNER JOIN rooms ON reservations.RoomId = rooms.id INNER JOIN room_type ON rooms.RoomType = room_type.id WHERE rooms.id = ?;",
        [guest.id]
      );
      let reservation = [];
      const results = rows as any[];
      if (results.length != 0) {
        reservation = results[0];
      }
      //@ts-ignore
      guest.Reservations = reservation;
    })
  );
  return res;
}

export async function createRoom(roomNumber: number, roomType: number) {
  const info = {
    RoomNumber: roomNumber,
    RoomType: roomType,
  };
  //@ts-ignore
  const [result] = await contprom.query("INSERT INTO rooms SET ? ", [info]);
  const res = result as any[];
  //@ts-ignore
  if (!res.insertId) return false;
  //@ts-ignore
  return res.insertId;
}

export async function deleteRoom(roomId: number) {
  const [rows] = await contprom.query("SELECT * FROM reservations WHERE RoomId=?", [roomId]);
  const reservatios = rows as any[];
  if (reservatios.length == 0) {
    const [rows] = await contprom.query("DELETE FROM rooms WHERE id=?", [roomId]);
    return true;
  }
  return false;
}

export async function updateRoom(roomId: number, roomNumber: number, roomType: number) {
  const [rows] = await contprom.query("UPDATE rooms SET RoomNumber=?, RoomType=? WHERE id=?", [
    roomNumber,
    roomType,
    roomId,
  ]);
  if (!rows) return false;
  return true;
}

export async function getRooms() {
  const [rows] = await contprom.query(
    "SELECT rooms.id as RoomId, rooms.RoomNumber, room_type.id as RoomTypeId, room_type.Name, room_type.NumberOfBeds, room_type.Description, room_type.DailyPrice FROM rooms INNER JOIN room_type ON rooms.RoomType=room_type.id;"
  );
  const res = rows as any[];
  return res;
}

export async function getRoomById(roomId: number) {
  const [rows] = await contprom.query(
    "SELECT rooms.id as RoomId, rooms.RoomNumber, room_type.id as RoomTypeId, room_type.Name, room_type.NumberOfBeds, room_type.Description, room_type.DailyPrice FROM rooms INNER JOIN room_type ON rooms.RoomType=room_type.id WHERE rooms.id = ?;",
    [roomId]
  );
  const res = rows as any[];
  if (res.length == 0) return false;
  return res[0];
}

export async function getRoomTypes() {
  const [rows] = await contprom.query("SELECT * FROM room_type");
  const res = rows as any[];
  return res;
}

export async function deleteRoomType(roomTypeId: number) {
  const [rows] = await contprom.query("SELECT * FROM rooms WHERE RoomType=?", [roomTypeId]);
  const rooms = rows as any[];
  if (rooms.length == 0) {
    const [rows] = await contprom.query("DELETE FROM room_type WHERE id=?", [roomTypeId]);
    return true;
  }
  return false;
}

export async function getRoomType(roomTypeId: number) {
  const [rows] = await contprom.query("SELECT * FROM room_type WHERE id=?", [roomTypeId]);
  const res = rows as any[];
  if (res.length == 0) return false;
  return res[0];
}

export async function addRoomType(name: string, numOfBeds: number, description: string, dailyPrice: number) {
  let info = {
    Name: name,
    NumberOfBeds: numOfBeds,
    Description: description,
    DailyPrice: dailyPrice,
  };
  const [rows] = await contprom.query("INSERT INTO room_type SET ?", [info]);
  const res = rows as any;
  if (!res.insertId) return false;
  return res.insertId;
}

export async function addReservation(
  guestId: number,
  roomId: number,
  startDate: string,
  endDate: string,
  price: number
) {
  let info = {
    GuestId: guestId,
    RoomId: roomId,
    StartDate: startDate,
    EndDate: endDate,
    Price: price,
  };

  const [rows] = await contprom.query(
    "SELECT * FROM reservations WHERE RoomId=? AND ((StartDate <= ? AND EndDate >= ?) OR (StartDate <= ? AND EndDate >= ?) OR (StartDate >= ? AND EndDate <= ?))",
    [roomId, startDate, startDate, endDate, endDate, startDate, endDate]
  );
  const res = rows as any[];
  if (res.length != 0) return "Already_Reserved";

  const [rows2] = await contprom.query("SELECT * FROM rooms WHERE id=?", [roomId]);
  const res2 = rows2 as any[];
  if (res2.length == 0) return false;

  const [rows3] = await contprom.query("SELECT * FROM guests WHERE id=?", [guestId]);
  const res3 = rows3 as any[];
  if (res3.length == 0) return false;

  const [rows4] = await contprom.query("INSERT INTO reservations SET ?", [info]);
  const res4 = rows4 as any;
  if (!res4.insertId) return false;
  return res4.insertId;
}

export async function getReservationById(reservationId: number) {
  const [rows] = await contprom.query(
    "SELECT reservations.id as ReservationId, reservations.GuestId, reservations.RoomId, reservations.StartDate, reservations.EndDate, reservations.Price, guests.FullName as GuestName, rooms.RoomNumber, room_type.id as RoomTypeId, room_type.Name as RoomTypeName, room_type.NumberOfBeds, room_type.Description, room_type.DailyPrice FROM reservations INNER JOIN guests ON reservations.GuestId = guests.id INNER JOIN rooms ON reservations.RoomId = rooms.id INNER JOIN room_type ON rooms.RoomType = room_type.id WHERE reservations.id = ?;",
    [reservationId]
  );
  const res = rows as any[];
  if (res.length == 0) return false;
  return res[0];
}

export async function deleteReservation(reservationId: number) {
  const [rows] = await contprom.query("DELETE FROM reservations WHERE id=?", [reservationId]);
  return true;
}

export async function getUserBySessionToken(token: string) {
  const [rows] = await contprom.query("SELECT * FROM sessions WHERE Token=?", [token]);
  const res = rows as any[];
  if (res.length == 0) return false;
  return res[0].UserId;
}

export async function getReservations() {
  const [rows] = await contprom.query(
    "SELECT reservations.id as ReservationId, reservations.GuestId, reservations.RoomId, reservations.StartDate, reservations.EndDate, reservations.Price, guests.FullName as GuestName, rooms.RoomNumber, room_type.Name as RoomTypeName, room_type.NumberOfBeds, room_type.Description, room_type.DailyPrice FROM reservations INNER JOIN guests ON reservations.GuestId = guests.id INNER JOIN rooms ON reservations.RoomId = rooms.id INNER JOIN room_type ON rooms.RoomType = room_type.id;"
  );
  const res = rows as any[];
  return res;
}

export async function editReservation(
  reservationId: number,
  guestId: number,
  roomId: number,
  startDate: string,
  endDate: string,
  price: number
) {
  const [rows] = await contprom.query(
    "SELECT * FROM reservations WHERE RoomId=? AND ((StartDate <= ? AND EndDate >= ?) OR (StartDate <= ? AND EndDate >= ?) OR (StartDate >= ? AND EndDate <= ?))",
    [roomId, startDate, startDate, endDate, endDate, startDate, endDate]
  );
  const res = rows as any[];
  if (res.length != 0) return "Already_Reserved";

  const [rows2] = await contprom.query("SELECT * FROM rooms WHERE id=?", [roomId]);
  const res2 = rows2 as any[];
  if (res2.length == 0) return false;

  const [rows3] = await contprom.query("SELECT * FROM guests WHERE id=?", [guestId]);
  const res3 = rows3 as any[];
  if (res3.length == 0) return false;

  const [rows4] = await contprom.query(
    "UPDATE reservations SET GuestId=?, RoomId=?, StartDate=?, EndDate=?, Price=? WHERE id=?",
    [guestId, roomId, startDate, endDate, price, reservationId]
  );
  if (!rows4) return false;
  return true;
}
