import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../lib/axios';
import { GetBookmarksResponse } from '../../../types/post';

export const useGetBookmarks = () => {
  return useQuery({
    queryKey: ['bookmarks'],
    queryFn: async () => {
      const response = await apiClient.get<GetBookmarksResponse>('/post/get-bookmarks');
      return response.data;
    },
    enabled: true,
  });
};
