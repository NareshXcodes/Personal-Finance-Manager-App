import { axiosInstance } from './axiosInstance';
import { User } from '@/types'; // Let's assume we have a User type, or we'll define a basic one

export const authApi = {
  register: async (email: string, password: string): Promise<User> => {
    const response = await axiosInstance.post<User>('/auth/register', { email, password });
    return response.data;
  },

  login: async (email: string, password: string): Promise<{ access_token: string; token_type: string }> => {
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);

    const response = await axiosInstance.post<{ access_token: string; token_type: string }>(
      '/auth/login',
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data;
  },
};
