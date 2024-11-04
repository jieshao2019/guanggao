import create from 'zustand';
import axios from 'axios';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  username: string;
  email: string;
  vipLevel: number;
  points: number;
  balance: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        try {
          const { data } = await axios.post('/api/auth/login', {
            email,
            password,
          });

          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
          });

          // Set default Authorization header
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        }
      },

      register: async (username, email, password) => {
        try {
          const { data } = await axios.post('/api/auth/register', {
            username,
            email,
            password,
          });

          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
          });

          // Set default Authorization header
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        } catch (error) {
          console.error('Registration error:', error);
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });

        // Remove Authorization header
        delete axios.defaults.headers.common['Authorization'];
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);