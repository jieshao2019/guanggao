import create from 'zustand';
import { useWalletApi } from '../hooks/useApi';

interface Transaction {
  id: number;
  type: 'withdraw' | 'convert' | 'reward';
  amount: number;
  status: 'pending' | 'completed' | 'rejected';
  createdAt: string;
}

interface WalletStore {
  balance: number;
  points: number;
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  fetchTransactions: () => Promise<void>;
  withdraw: (amount: number, method: string) => Promise<void>;
  convertPoints: (points: number) => Promise<void>;
}

export const useWalletStore = create<WalletStore>((set, get) => {
  const walletApi = useWalletApi();

  return {
    balance: 0,
    points: 0,
    transactions: [],
    loading: false,
    error: null,

    fetchTransactions: async () => {
      try {
        set({ loading: true, error: null });
        const transactions = await walletApi.getTransactions();
        set({ transactions, loading: false });
      } catch (error) {
        set({ error: 'Failed to fetch transactions', loading: false });
      }
    },

    withdraw: async (amount, method) => {
      try {
        set({ loading: true, error: null });
        await walletApi.withdraw(amount, method);
        set((state) => ({
          balance: state.balance - amount,
          loading: false
        }));
      } catch (error) {
        set({ error: 'Failed to withdraw', loading: false });
        throw error;
      }
    },

    convertPoints: async (points) => {
      try {
        set({ loading: true, error: null });
        const result = await walletApi.convertPoints(points);
        set((state) => ({
          points: state.points - points,
          balance: state.balance + result.amount,
          loading: false
        }));
      } catch (error) {
        set({ error: 'Failed to convert points', loading: false });
        throw error;
      }
    },
  };
});