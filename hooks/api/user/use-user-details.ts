import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiClient } from '../../../lib/axios';
import { GetUserDetailsResponse } from '../../../types/user';

const getUserDetails = async (userId: string): Promise<GetUserDetailsResponse> => {
  const response = await apiClient.get<GetUserDetailsResponse>(`/user/${userId}/get-details`);
  return response.data;
};

export const useUserDetails = (
  userId?: string,
  options?: Omit<UseQueryOptions<GetUserDetailsResponse, Error, GetUserDetailsResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['user-details', userId],
    queryFn: () => getUserDetails(userId as string),
    enabled: !!userId,
    ...options,
  });
};
