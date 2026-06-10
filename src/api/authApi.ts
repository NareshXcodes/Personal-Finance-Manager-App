import { axiosInstance } from './axiosInstance';
import { User } from '@/types'; // Let's assume we have a User type, or we'll define a basic one

export const authApi = {
  register: async (email: string, password: string): Promise<User> => {
    const response = await axiosInstance.post<User>('/auth/register', { email, password });
    return response.data;
  },

  login: async (email: string, password: string): Promise<{ access_token: string; token_type: string }> => {
    // Standard OAuth2 form data is often used, but we'll use JSON based on the request style, 
    // or standard JSON. We'll use JSON for simplicity unless URL encoded is strictly required by the backend.
    const response = await axiosInstance.post<{ access_token: string; token_type: string }>('/auth/login', {
      email,
      password,
    });
    return response.data;
  },
};
