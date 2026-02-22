import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiClient } from '../../../lib/axios';
import { GetPostDetailsResponse } from '../../../types/post';

const getPostDetails = async (postId: string): Promise<GetPostDetailsResponse> => {
  const response = await apiClient.get<GetPostDetailsResponse>(`/post/${postId}`);
  return response.data;
};

export const usePostDetails = (
  postId?: string,
  options?: Omit<UseQueryOptions<GetPostDetailsResponse, Error, GetPostDetailsResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['post-details', postId],
    queryFn: () => getPostDetails(postId as string),
    enabled: !!postId,
    ...options,
  });
};
