import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../lib/axios';
import { SearchUsersResponse } from '../../../types/user';

export const useSearchUsers = (query: string) => {
  return useQuery({
    queryKey: ['search-users', query],
    queryFn: async () => {
      if (!query.trim()) {
        return { users: [] } as SearchUsersResponse;
      }
      const response = await apiClient.get<SearchUsersResponse>(`/user/search?query=${encodeURIComponent(query)}`);
      return response.data;
    },
    enabled: true, // Always enabled, but queryFn handles empty query
  });
};
