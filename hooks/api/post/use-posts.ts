import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '../../../lib/axios';
import { GetPostsResponse } from '../../../types/post';

export const POSTS_PER_PAGE = 5;

const getPosts = async ({ pageParam = 1 }: { pageParam?: number }): Promise<GetPostsResponse> => {
  const response = await apiClient.get<GetPostsResponse>(
    `/post/load?page=${pageParam}&postsPerPage=${POSTS_PER_PAGE}`
  );
  return response.data;
};

export const usePosts = () => {
  return useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // If the last page returned the maximum number of posts, assume there might be a next page
      if (lastPage.posts.length === POSTS_PER_PAGE) {
        return allPages.length + 1;
      }
      return undefined; // No more pages
    },
  });
};
