import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

interface Friend {
  id: number;
  username: string;
  vipLevel: number;
  status: 'online' | 'offline' | 'playing';
}

export function useFriends() {
  const queryClient = useQueryClient();

  const { data: friends, isLoading } = useQuery<Friend[]>(
    'friends',
    async () => {
      const { data } = await axios.get('/api/friends');
      return data;
    }
  );

  const sendFriendRequest = useMutation(
    async (userId: number) => {
      const { data } = await axios.post(`/api/friends/request/${userId}`);
      return data;
    }
  );

  const respondToFriendRequest = useMutation(
    async ({ userId, status }: { userId: number; status: 'accepted' | 'rejected' }) => {
      const { data } = await axios.put(`/api/friends/request/${userId}`, { status });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('friends');
      },
    }
  );

  const removeFriend = useMutation(
    async (userId: number) => {
      const { data } = await axios.delete(`/api/friends/${userId}`);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('friends');
      },
    }
  );

  return {
    friends,
    isLoading,
    sendFriendRequest,
    respondToFriendRequest,
    removeFriend,
  };
}