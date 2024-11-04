import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

interface Friend {
  id: number;
  username: string;
  status: 'online' | 'offline' | 'playing';
  vipLevel: number;
}

interface FriendRequest {
  id: number;
  username: string;
  createdAt: string;
}

interface ChatMessage {
  id: number;
  senderId: number;
  content: string;
  read: boolean;
  createdAt: string;
}

export function useSocial() {
  const queryClient = useQueryClient();

  const { data: friends, isLoading: loadingFriends } = useQuery<Friend[]>(
    'friends',
    async () => {
      const { data } = await axios.get('/api/friends');
      return data;
    }
  );

  const { data: requests } = useQuery<FriendRequest[]>(
    'friendRequests',
    async () => {
      const { data } = await axios.get('/api/friends/requests');
      return data;
    }
  );

  const sendRequest = useMutation<void, unknown, number>(
    async (userId) => {
      await axios.post(`/api/friends/request/${userId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('friendRequests');
      },
    }
  );

  const respondToRequest = useMutation<void, unknown, { userId: number; accept: boolean }>(
    async ({ userId, accept }) => {
      await axios.put(`/api/friends/request/${userId}`, { accept });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('friendRequests');
        queryClient.invalidateQueries('friends');
      },
    }
  );

  const { data: messages, isLoading: loadingMessages } = useQuery<ChatMessage[]>(
    'chatMessages',
    async () => {
      const { data } = await axios.get('/api/messages');
      return data;
    }
  );

  const sendMessage = useMutation<void, unknown, { userId: number; content: string }>(
    async ({ userId, content }) => {
      await axios.post(`/api/messages/${userId}`, { content });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('chatMessages');
      },
    }
  );

  return {
    friends,
    requests,
    messages,
    isLoading: loadingFriends || loadingMessages,
    sendRequest,
    respondToRequest,
    sendMessage,
  };
}