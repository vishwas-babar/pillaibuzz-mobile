import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../../lib/axios';
import { GetPostDetailsResponse, LikePostResponse } from '../../../types/post';

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      const response = await apiClient.post<LikePostResponse>(`/post/${postId}/like`);
      return response.data;
    },
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['post-details', postId] });

      const previousPostDetails = queryClient.getQueryData<GetPostDetailsResponse>(['post-details', postId]);

      if (previousPostDetails) {
        queryClient.setQueryData<GetPostDetailsResponse>(['post-details', postId], {
          ...previousPostDetails,
          likesCount: previousPostDetails.likesCount + 1,
        });
      }

      return { previousPostDetails };
    },
    onError: (err, postId, context) => {
      if (context?.previousPostDetails) {
        queryClient.setQueryData(['post-details', postId], context.previousPostDetails);
      }
    },
    onSettled: (data, error, postId) => {
      queryClient.invalidateQueries({ queryKey: ['post-details', postId] });
    },
  });
};
