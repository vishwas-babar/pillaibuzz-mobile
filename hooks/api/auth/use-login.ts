import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { apiClient } from '../../../lib/axios';

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface LoginResponse {
  message: string;
  uid: string;
}

const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/user/login', data);
  return response.data;
};

export const useLogin = (options?: UseMutationOptions<LoginResponse, Error, LoginRequest>) => {
  return useMutation({
    mutationFn: loginUser,
    ...options,
  });
};
