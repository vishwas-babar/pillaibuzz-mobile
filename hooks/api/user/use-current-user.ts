import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiClient } from '../../../lib/axios';
import { GetCurrentUserResponse } from '../../../types/user';

const getCurrentUser = async (): Promise<GetCurrentUserResponse> => {
  const response = await apiClient.get<GetCurrentUserResponse>('/user/get-current-user');
  return response.data;
};

export const useCurrentUser = (
  options?: Omit<UseQueryOptions<GetCurrentUserResponse, Error, GetCurrentUserResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: getCurrentUser,
    ...options,
  });
};
