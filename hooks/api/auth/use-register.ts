import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { Platform } from 'react-native';
import { apiClient } from '../../../lib/axios';

export interface RegisterRequest {
  name: string;
  userId: string;
  email: string;
  password?: string;
  profilePhoto?: {
    uri: string;
    name: string;
    type: string;
  };
}

export interface RegisterResponse {
  message: string;
  _id?: string;
}

const registerUser = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('userId', data.userId);
  formData.append('email', data.email);
  if (data.password) {
    formData.append('password', data.password);
  }
  
  if (data.profilePhoto) {
    formData.append('profilePhoto', {
      uri: Platform.OS === 'ios' ? data.profilePhoto.uri.replace('file://', '') : data.profilePhoto.uri,
      name: data.profilePhoto.name || 'profile_photo.jpg',
      type: data.profilePhoto.type || 'image/jpeg',
    } as any);
  }

  const response = await apiClient.post<RegisterResponse>('/user/signup', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const useRegister = (options?: UseMutationOptions<RegisterResponse, Error, RegisterRequest>) => {
  return useMutation({
    mutationFn: registerUser,
    ...options,
  });
};
