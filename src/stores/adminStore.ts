import create from 'zustand';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/admin'
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface AdminStore {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  getUsers: (page: number, search?: string) => Promise<any>;
  getGames: () => Promise<any>;
  getTransactions: (status?: string) => Promise<any>;
  getReports: (status?: string) => Promise<any>;
  handleReport: (reportId: number, action: string) => Promise<void>;
  handleTransaction: (transactionId: number, status: string) => Promise<void>;
}

export const useAdminStore = create<AdminStore>((set, get) => ({
  isAuthenticated: !!localStorage.getItem('adminToken'),
  loading: false,
  error: null,

  login: async (username, password) => {
    try {
      set({ loading: true, error: null });
      const { data } = await api.post('/auth/login', { username, password });
      localStorage.setItem('adminToken', data.token);
      set({ isAuthenticated: true, loading: false });
    } catch (error) {
      set({ error: 'Invalid credentials', loading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('adminToken');
    set({ isAuthenticated: false });
  },

  getUsers: async (page, search) => {
    try {
      set({ loading: true, error: null });
      const { data } = await api.get('/users', {
        params: { page, search }
      });
      set({ loading: false });
      return data;
    } catch (error) {
      set({ error: 'Failed to fetch users', loading: false });
      throw error;
    }
  },

  getGames: async () => {
    try {
      set({ loading: true, error: null });
      const { data } = await api.get('/games');
      set({ loading: false });
      return data;
    } catch (error) {
      set({ error: 'Failed to fetch games', loading: false });
      throw error;
    }
  },

  getTransactions: async (status) => {
    try {
      set({ loading: true, error: null });
      const { data } = await api.get('/transactions', {
        params: { status }
      });
      set({ loading: false });
      return data;
    } catch (error) {
      set({ error: 'Failed to fetch transactions', loading: false });
      throw error;
    }
  },

  getReports: async (status) => {
    try {
      set({ loading: true, error: null });
      const { data } = await api.get('/reports', {
        params: { status }
      });
      set({ loading: false });
      return data;
    } catch (error) {
      set({ error: 'Failed to fetch reports', loading: false });
      throw error;
    }
  },

  handleReport: async (reportId, action) => {
    try {
      set({ loading: true, error: null });
      await api.put(`/reports/${reportId}`, { action });
      set({ loading: false });
    } catch (error) {
      set({ error: 'Failed to handle report', loading: false });
      throw error;
    }
  },

  handleTransaction: async (transactionId, status) => {
    try {
      set({ loading: true, error: null });
      await api.put(`/transactions/${transactionId}/status`, { status });
      set({ loading: false });
    } catch (error) {
      set({ error: 'Failed to handle transaction', loading: false });
      throw error;
    }
  },
}));