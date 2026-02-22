import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiClient } from '../../../lib/axios';
import { GetPostCommentsResponse } from '../../../types/post';

const getPostComments = async (postId: string): Promise<GetPostCommentsResponse> => {
  const response = await apiClient.get<GetPostCommentsResponse>(`/post/${postId}/comments`);
  return response.data;
};

export const usePostComments = (
  postId?: string,
  options?: Omit<UseQueryOptions<GetPostCommentsResponse, Error, GetPostCommentsResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['post-comments', postId],
    queryFn: () => getPostComments(postId as string),
    enabled: !!postId,
    ...options,
  });
};
