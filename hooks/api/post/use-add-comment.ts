import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../../lib/axios';
import { AddCommentResponse, DetailedComment } from '../../../types/post';
import { User } from '../../../types/user';

interface AddCommentPayload {
  postId: string;
  content: string;
  currentUser: User;
}

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, content }: AddCommentPayload) => {
      const response = await apiClient.post<AddCommentResponse>(`/post/${postId}/addcomment`, { content });
      return response.data;
    },
    onMutate: async (newCommentPayload) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ['post-comments', newCommentPayload.postId] });

      // Snapshot the previous value
      const previousComments = queryClient.getQueryData<any>(['post-comments', newCommentPayload.postId]);

      // Create a temporary pessimistic ID
      const tempId = Math.random().toString();

      // Construct a fake optimistic comment matching the DetailedComment structure
      const optimisticComment: DetailedComment = {
        _id: tempId,
        comments: {
          content: newCommentPayload.content,
          createdBy: newCommentPayload.currentUser._id,
          likes: [],
          _id: tempId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          author_id: newCommentPayload.currentUser._id,
          authorName: newCommentPayload.currentUser.name,
          authorUserId: newCommentPayload.currentUser.userId,
          authorProfilePhoto: newCommentPayload.currentUser.profilePhoto || 'https://via.placeholder.com/150',
        },
      };

      // Optimistically update to the new value by unshifting to the top
      queryClient.setQueryData(['post-comments', newCommentPayload.postId], (old: any) => {
        if (!old) return { msg: 'optimistic', comments: [optimisticComment] };
        return {
          ...old,
          comments: [optimisticComment, ...old.comments],
        };
      });

      // Return a context object with the snapshotted value in case we need to rollback
      return { previousComments };
    },
    onError: (err, newCommentPayload, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      queryClient.setQueryData(['post-comments', newCommentPayload.postId], context?.previousComments);
    },
    onSettled: (data, error, variables) => {
      // Always refetch after error or success to synchronize with the server
      queryClient.invalidateQueries({ queryKey: ['post-comments', variables.postId] });
      queryClient.invalidateQueries({ queryKey: ['post-details', variables.postId] }); // ensure commentsCount on the post view updates
    },
  });
};
