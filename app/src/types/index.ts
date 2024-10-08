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
}

export interface ReservationFormData {
  GuestId: number;
  RoomId: number;
  StartDate: string;
  EndDate: string;
}
