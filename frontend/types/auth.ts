import { User } from './user';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  avatarVersion: number;
  incrementAvatarVersion: () => void;
}

// API Request/Response types (matching backend)
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  phone_number: string;
  dob: string;
  gender: string;
  email: string;
  password: string;
  confirm_password: string;
  otp_code: string;
}

export interface RegisterResponse {
  msg: string;
}

export interface GenerateOTPRequest {
  email: string;
  is_forget_password?: boolean;
}

export interface GenerateOTPResponse {
  msg: string;
}

export interface VerifyOTPRequest {
  email: string;
  code: string;
}

export interface VerifyOTPResponse {
  msg: string;
}

export interface ForgetPasswordRequest {
  email: string;
  password: string;
  confirm_password: string;
  otp_code: string;
}

export interface ForgetPasswordResponse {
  msg: string;
}