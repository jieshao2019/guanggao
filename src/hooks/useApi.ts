import axios from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { useAuth } from './useAuth';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized error
      localStorage.removeItem('token');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// Generic API query hook
export function useApiQuery<T>(
  key: string | readonly unknown[],
  url: string,
  options?: UseQueryOptions<T>
) {
  return useQuery<T>(
    key,
    async () => {
      const { data } = await api.get(url);
      return data;
    },
    options
  );
}

// API hooks for different features
export const useUserApi = () => {
  const { user } = useAuth();

  const getProfile = async () => {
    const { data } = await api.get('/users/profile');
    return data;
  };

  const updateProfile = async (profileData: any) => {
    const { data } = await api.put('/users/profile', profileData);
    return data;
  };

  return { getProfile, updateProfile };
};

export const useGameApi = () => {
  const getGames = async () => {
    const { data } = await api.get('/games');
    return data;
  };

  const getGameDetails = async (gameId: number) => {
    const { data } = await api.get(`/games/${gameId}`);
    return data;
  };

  const submitScore = async (gameId: number, score: number) => {
    const { data } = await api.post(`/games/${gameId}/scores`, { score });
    return data;
  };

  return { getGames, getGameDetails, submitScore };
};

export const useAdApi = () => {
  const getAds = async () => {
    const { data } = await api.get('/ads');
    return data;
  };

  const completeAd = async (adId: number, duration: number) => {
    const { data } = await api.post(`/ads/${adId}/complete`, { duration });
    return data;
  };

  return { getAds, completeAd };
};

export const useWalletApi = () => {
  const getTransactions = async () => {
    const { data } = await api.get('/transactions');
    return data;
  };

  const withdraw = async (amount: number, method: string) => {
    const { data } = await api.post('/transactions/withdraw', { amount, method });
    return data;
  };

  const convertPoints = async (points: number) => {
    const { data } = await api.post('/transactions/convert', { points });
    return data;
  };

  return { getTransactions, withdraw, convertPoints };
};

export const useFriendsApi = () => {
  const getFriends = async () => {
    const { data } = await api.get('/friends');
    return data;
  };

  const sendRequest = async (userId: number) => {
    const { data } = await api.post(`/friends/request/${userId}`);
    return data;
  };

  const respondToRequest = async (userId: number, accept: boolean) => {
    const { data } = await api.put(`/friends/request/${userId}`, {
      status: accept ? 'accepted' : 'rejected'
    });
    return data;
  };

  return { getFriends, sendRequest, respondToRequest };
};

export const useNotificationsApi = () => {
  const getNotifications = async () => {
    const { data } = await api.get('/notifications');
    return data;
  };

  const markAsRead = async (notificationId: number) => {
    const { data } = await api.put(`/notifications/${notificationId}/read`);
    return data;
  };

  const markAllAsRead = async () => {
    const { data } = await api.put('/notifications/read-all');
    return data;
  };

  return { getNotifications, markAsRead, markAllAsRead };
};