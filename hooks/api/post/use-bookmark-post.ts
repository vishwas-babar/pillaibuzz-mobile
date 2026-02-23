import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../../lib/axios';
import { GetPostsResponse } from '../../../types/post';

interface BookmarkPostResponse {
  msg: string;
}

export const useBookmarkPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      const response = await apiClient.post<BookmarkPostResponse>(`/post/${postId}/bookmark`);
      return response.data;
    },
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      const previousPosts = queryClient.getQueryData<InfiniteData<GetPostsResponse>>(['posts']);

      if (previousPosts) {
        queryClient.setQueryData<InfiniteData<GetPostsResponse>>(['posts'], {
          ...previousPosts,
          pages: previousPosts.pages.map((page) => ({
            ...page,
            posts: page.posts.map((post) =>
              post._id === postId
                ? { ...post, isBookmarked: !(post.isBookmarked ?? false) }
                : post
            ),
          })),
        });
      }

      return { previousPosts };
    },
    onError: (_err, _postId, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });
};
