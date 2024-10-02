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
