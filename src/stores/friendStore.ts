import create from 'zustand';
import { useFriendsApi } from '../hooks/useApi';

interface Friend {
  id: number;
  username: string;
  status: 'online' | 'offline' | 'playing';
  vipLevel: number;
}

interface FriendRequest {
  id: number;
  senderId: number;
  username: string;
  createdAt: string;
}

interface FriendStore {
  friends: Friend[];
  requests: FriendRequest[];
  loading: boolean;
  error: string | null;
  fetchFriends: () => Promise<void>;
  fetchRequests: () => Promise<void>;
  sendRequest: (userId: number) => Promise<void>;
  respondToRequest: (userId: number, accept: boolean) => Promise<void>;
}

export const useFriendStore = create<FriendStore>((set, get) => {
  const friendsApi = useFriendsApi();

  return {
    friends: [],
    requests: [],
    loading: false,
    error: null,

    fetchFriends: async () => {
      try {
        set({ loading: true, error: null });
        const friends = await friendsApi.getFriends();
        set({ friends, loading: false });
      } catch (error) {
        set({ error: 'Failed to fetch friends', loading: false });
      }
    },

    fetchRequests: async () => {
      try {
        set({ loading: true, error: null });
        const requests = await friendsApi.getFriendRequests();
        set({ requests, loading: false });
      } catch (error) {
        set({ error: 'Failed to fetch requests', loading: false });
      }
    },

    sendRequest: async (userId) => {
      try {
        set({ loading: true, error: null });
        await friendsApi.sendRequest(userId);
        set({ loading: false });
      } catch (error) {
        set({ error: 'Failed to send request', loading: false });
        throw error;
      }
    },

    respondToRequest: async (userId, accept) => {
      try {
        set({ loading: true, error: null });
        await friendsApi.respondToRequest(userId, accept);
        set((state) => ({
          requests: state.requests.filter(r => r.senderId !== userId),
          loading: false
        }));
      } catch (error) {
        set({ error: 'Failed to respond to request', loading: false });
        throw error;
      }
    },
  };
});