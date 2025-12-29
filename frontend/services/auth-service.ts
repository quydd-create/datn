import { API_ENDPOINTS } from '@/constants';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  GenerateOTPRequest,
  GenerateOTPResponse,
  VerifyOTPRequest,
  VerifyOTPResponse,
  ForgetPasswordRequest,
  ForgetPasswordResponse,
} from '@/types/auth';
import axiosInstance from '@/utils/axiosInstance';

// Auth Service Functions (Pure functions, no React hooks)
export const authService = {
  // Login user
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response.data;
  },

  // Logout
  logout: async (): Promise<{ message: string }> => {
    const response = await axiosInstance.post<{ message: string }>(
      API_ENDPOINTS.AUTH.LOGOUT
    );
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await axiosInstance.post<RegisterResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );
    return response.data;
  },

  generateOTP: async (data: GenerateOTPRequest): Promise<GenerateOTPResponse> => {
    const response = await axiosInstance.post<GenerateOTPResponse>(
      API_ENDPOINTS.OTP.GENERATE + '?email=' + data.email + '&is_forget_password=' + data.is_forget_password,
    );
    return response.data;
  },

  verifyOTP: async (data: VerifyOTPRequest): Promise<VerifyOTPResponse> => {
    const response = await axiosInstance.post<VerifyOTPResponse>(
      API_ENDPOINTS.OTP.VERIFY + '?email=' + data.email + '&code=' + data.code,
      data
    );
    return response.data;
  },

  forgetPassword: async (data: ForgetPasswordRequest): Promise<ForgetPasswordResponse> => {
    const response = await axiosInstance.post<ForgetPasswordResponse>(
      API_ENDPOINTS.AUTH.FORGET_PASSWORD,
      data
    );
    return response.data;
  }
};