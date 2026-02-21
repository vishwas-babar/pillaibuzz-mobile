import axios from 'axios';
import { storage } from './storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    console.log(`🚀 [API Request] ${config.method?.toUpperCase()} ${config.baseURL || ''}${config.url || ''}`);
    if (config.data) {
      console.log(`📦 [API Request Data]:`, JSON.stringify(config.data, null, 2));
    }

    const token = await storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(`❌ [API Request Error]:`, error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ [API Response] ${response.config.method?.toUpperCase()} ${response.config.baseURL || ''}${response.config.url || ''} - Status: ${response.status}`);
    if (response.data) {
      console.log(`📄 [API Response Data]:`, JSON.stringify(response.data, null, 2));
    }
    return response;
  },
  async (error) => {
    console.error(`🚨 [API Error Response] ${error.config?.method?.toUpperCase()} ${error.config?.baseURL || ''}${error.config?.url || ''} - Status: ${error.response?.status || 'UNKNOWN'}`);
    console.error(`💥 [API Error Data]:`, error.response?.data || error.message);

    // Optionally handle 401 unauthorized to clear token
    if (error.response?.status === 401) {
      await storage.removeToken();
    }
    return Promise.reject(error);
  }
);
