// Route constants
export const PUBLIC_ROUTES = ['/login', '/register', '/forgot_password', '/'];

export const PROTECTED_ROUTES = ['/profile'];

export const ADMIN_ROUTES = ['/admin'];

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: 'v1/auth/login',
    LOGOUT: 'v1/auth/logout',
    REGISTER: 'v1/auth/register',
    FORGET_PASSWORD: 'v1/auth/forget-password',
  },
  OTP: {
    GENERATE: 'v1/otps/generate',
    VERIFY: 'v1/otps/verify',
  },
  USERS: {
    ME: 'v1/users/me',
    UPDATE_PROFILE: 'v1/users/profile',
    UPDATE_AVATAR: 'v1/users/avatar',
  },
} as const;