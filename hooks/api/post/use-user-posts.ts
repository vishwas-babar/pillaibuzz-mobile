import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiClient } from '../../../lib/axios';
import { GetUserPostsResponse } from '../../../types/post';

const getUserPosts = async (userId: string): Promise<GetUserPostsResponse> => {
  const response = await apiClient.get<GetUserPostsResponse>(`/post/userposts/${userId}`);
  return response.data;
};

export const useUserPosts = (
  userId?: string,
  options?: Omit<UseQueryOptions<GetUserPostsResponse, Error, GetUserPostsResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['user-posts', userId],
    queryFn: () => getUserPosts(userId as string),
    enabled: !!userId,
    ...options,
  });
};
