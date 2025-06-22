import {UserRole} from "./user";

export interface RegisterRequest {
  email: string;
  fullName: string;
  phone: string;
  password: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface UpdateProfileRequest {
  fullName?: string;
  phone?: string;
  avatar?: string;
}

export interface AuthResponse {
  access_token: string;
  user: UserProfile;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  emailVerified: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}
