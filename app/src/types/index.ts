export interface User {
  id: number;
  Username: string;
  FullName: string;
  RankName: string;
  Permission: number;
  CreatedAt: string;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface Stats {
  guests: number;
  rooms: number;
  reservations: number;
  roomtypeStats: RoomTypeStat[];
  guestReservationStats: GuestReservationStat[];
  guestsSpentMoney: GuestSpentMoney[];
  guestsPayMoreThanAvg: Guest[];
}

export interface GuestSpentMoney {
  FullName: string;
  TotalPaid: number;
}

export interface GuestReservationStat {
  FullName: string;
  ReservationCount: number;
}

export interface RoomTypeStat {
  RoomType: string;
  ReservationCount: number;
  AveragePrice: string;
}

export interface Room {
  RoomId: number;
  Name: string;
  RoomNumber: number;
  NumberOfBeds: string;
  Description: string;
  DailyPrice: number;
}

export interface NewRoomFormData {
  roomNumber: string;
  roomType: number;
}

export interface NewGuestFormData {
  Name: string;
  Date: string;
  Email: string;
  Phone: string;
}

export interface Guest {
  id: number;
  FullName: string;
  BirthDate: string;
  Email: string;
  Phone: string;
  Reservations: Reservation[];
}

export interface ReservationFormData {
  GuestId: number;
  RoomId: number;
  StartDate: string;
  EndDate: string;
}

export interface Reservation {
  ReservationId: number;
  GuestId: number;
  RoomId: number;
  StartDate: string;
  EndDate: string;
  Price: number;
  GuestName: string;
  RoomNumber: number;
  RoomTypeId?: number;
  RoomTypeName: string;
  NumberOfBeds: number;
  Description: string;
  DailyPrice: number;
}
