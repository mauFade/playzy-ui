export interface LoginInterface {
  email: string;
  password: string;
}

export interface LoginResponseInterface {
  user_id: string;
  token: string;
}

export interface CreateUserInterface {
  name: string;
  email: string;
  phone: string;
  password: string;
  gamertag: string;
}

export interface CreateUserResponseInterface {
  id: string;
  name: string;
  email: string;
  phone: string;
  gamertag: string;
  is_deleted: boolean;
  deleted_at: string | null;
  updated_at: string;
  created_at: string;
}
