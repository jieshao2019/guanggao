import create from 'zustand';
import axios from 'axios';

interface User {
  id: string;
  username: string;
  email: string;
  vipLevel: number;
  points: number;
  balance: number;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<void>;
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  
  login: async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      });
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      set({ token, user });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null });
  },

  register: async (username, email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        username,
        email,
        password,
      });
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      set({ token, user });
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
}));