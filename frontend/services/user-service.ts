import { API_ENDPOINTS } from '@/constants';
import { ProfileFormData } from "@/schemas/user";
import type { User } from '@/types';
import axiosInstance from "@/utils/axiosInstance";

// User Service Functions
export const userService = {
  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const response = await axiosInstance.get<User>(API_ENDPOINTS.USERS.ME);
    return response.data;
  },

  updateProfile: async (data: ProfileFormData): Promise<{ message: string }> => {
    const response = await axiosInstance.put<{ message: string }>(API_ENDPOINTS.USERS.UPDATE_PROFILE, data);
    return response.data;
  },

  updateAvatar: async (avatar_file: File): Promise<{ message: string, avatar_url: string }> => {
    const formData = new FormData();
    formData.append("avatar_file", avatar_file);
    
    // Axios will automatically set Content-Type to multipart/form-data with boundary
    const response = await axiosInstance.put<{ message: string, avatar_url: string }>(
      API_ENDPOINTS.USERS.UPDATE_AVATAR,
      formData
    );
    return response.data;
  },
};