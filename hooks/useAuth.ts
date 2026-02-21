import { useCallback, useEffect, useState } from 'react';
import { storage } from '../lib/storage';
import { useCurrentUser } from './api/user/use-current-user';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isStorageLoading, setIsStorageLoading] = useState<boolean>(true);
  const [token, setTokenState] = useState<string | null>(null);

  const checkAuth = useCallback(async () => {
    setIsStorageLoading(true);
    try {
      const storedToken = await storage.getToken();
      if (storedToken) {
        setTokenState(storedToken);
        setIsAuthenticated(true);
      } else {
        setTokenState(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Failed to check auth status:', error);
      setIsAuthenticated(false);
    } finally {
      setIsStorageLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Fetch user data when we have a token
  const { data: userResponse, isLoading: isUserLoading, refetch } = useCurrentUser({
    enabled: !!token,
  });

  const login = useCallback(async (newToken: string) => {
    await storage.setToken(newToken);
    setTokenState(newToken);
    setIsAuthenticated(true);
    return true;
  }, []);

  const logout = useCallback(async () => {
    await storage.removeToken();
    setTokenState(null);
    setIsAuthenticated(false);
  }, []);

  const isLoading = isStorageLoading || (!!token && isUserLoading);
  const user = userResponse?.data || null;

  return {
    isAuthenticated,
    isLoading,
    token,
    user,
    login,
    logout,
    checkAuth,
    refetchUser: refetch,
  };
};
