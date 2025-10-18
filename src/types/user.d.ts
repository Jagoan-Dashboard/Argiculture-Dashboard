


export interface UserOld {
  id: number;
  email: string;
  no_wa: string;
  nama: string;
  password: string;
  pekerjaan: string;
  peran: string;
  foto: string;
  accountID: string;
  isVerified: boolean;
  role_id: number;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
}


export interface User {
  id: string;
  username: string;
  email: string;
  role: "ADMIN" | "OPERATOR" | "USER";
  is_active: boolean;
  created_at: string;
  updated_at: string;
}


export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
    expires_in: number;
  };
}


export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface Role {
  id: number;
  name: string;
}