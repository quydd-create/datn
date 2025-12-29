import { PUBLIC_ROUTES } from "@/constants/routes";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ✅ Add request interceptor to dynamically get token
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage on every request
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // If data is FormData, remove Content-Type header to let axios set it automatically with boundary
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Add response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 unauthorized (token expired)
    if (error.response?.status === 401) {
      // Clear invalid token
      localStorage.removeItem("auth_token");
      // Redirect to login (you can customize this)
      if (typeof window !== 'undefined') {
        if(!PUBLIC_ROUTES.includes(window.location.pathname)) {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
