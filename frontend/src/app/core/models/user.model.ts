export interface User {
  id?: number;
  nom: string;
  email: string;
  motDePasse?: string;
  roleId?: number;
  role?: string;
  actif: boolean;
}

export interface AuthResponse {
  token: string;
  email: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  motDePasse: string;
}
