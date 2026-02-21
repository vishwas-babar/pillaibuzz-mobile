import { createMMKV } from 'react-native-mmkv';

export const mmkv = createMMKV({
  id: 'auth-storage',
  encryptionKey: 'pillaibuzz-secure-key'
});

const TOKEN_KEY = 'auth_token';

export const storage = {
  getItem: async (key: string) => {
    try {
      return mmkv.getString(key) || null;
    } catch (error) {
      console.error('Error getting item:', error);
      return null;
    }
  },
  setItem: async (key: string, value: string) => {
    try {
      mmkv.set(key, value);
    } catch (error) {
      console.error('Error setting item:', error);
    }
  },
  removeItem: async (key: string) => {
    try {
      mmkv.remove(key);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  },
  
  getToken: async () => storage.getItem(TOKEN_KEY),
  setToken: async (token: string) => storage.setItem(TOKEN_KEY, token),
  removeToken: async () => storage.removeItem(TOKEN_KEY),
};
