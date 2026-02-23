import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiClient } from '../../../lib/axios';
import { GetNotificationsResponse } from '../../../types/user';

const getNotifications = async (): Promise<GetNotificationsResponse> => {
  const response = await apiClient.get<GetNotificationsResponse>('/user/get-notifications');
  return response.data;
};

export const useNotifications = (
  options?: Omit<UseQueryOptions<GetNotificationsResponse, Error, GetNotificationsResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
    ...options,
  });
};
