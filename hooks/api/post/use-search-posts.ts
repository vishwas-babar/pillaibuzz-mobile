import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../lib/axios';
import { SearchPostsResponse } from '../../../types/post';

export const useSearchPosts = (query: string) => {
  return useQuery({
    queryKey: ['search-posts', query],
    queryFn: async () => {
      if (!query.trim()) {
        return { posts: [] } as SearchPostsResponse;
      }
      const response = await apiClient.get<SearchPostsResponse>(`/post/search?query=${encodeURIComponent(query)}`);
      return response.data;
    },
    enabled: true, // Always enabled, but queryFn handles empty query
  });
};
