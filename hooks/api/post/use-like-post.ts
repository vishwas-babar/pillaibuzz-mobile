import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../../lib/axios';
import { GetPostDetailsResponse, LikePostResponse } from '../../../types/post';
import { GetCurrentUserResponse } from '../../../types/user';

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
      const currentUser = queryClient.getQueryData<GetCurrentUserResponse>(['current-user'])?.data;

      if (previousPostDetails && currentUser) {
        const wasLiked = previousPostDetails.postContent.likes.includes(currentUser._id);
        const likes = wasLiked
          ? previousPostDetails.postContent.likes.filter((userId) => userId !== currentUser._id)
          : [...previousPostDetails.postContent.likes, currentUser._id];
        const likesCount = Math.max(0, previousPostDetails.likesCount + (wasLiked ? -1 : 1));

        queryClient.setQueryData<GetPostDetailsResponse>(['post-details', postId], {
          ...previousPostDetails,
          likesCount,
          postContent: {
            ...previousPostDetails.postContent,
            likes,
          },
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
