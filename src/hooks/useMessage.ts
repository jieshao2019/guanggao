import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  read: boolean;
  createdAt: string;
  senderName: string;
}

export function useMessages(userId?: number) {
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery<Message[]>(
    ['messages', userId],
    async () => {
      const { data } = await axios.get(`/api/messages${userId ? `/${userId}` : ''}`);
      return data;
    },
    {
      enabled: !!userId,
      refetchInterval: 5000, // Poll every 5 seconds
    }
  );

  const sendMessage = useMutation(
    async ({ userId, content }: { userId: number; content: string }) => {
      const { data } = await axios.post(`/api/messages/${userId}`, { content });
      return data;
    },
    {
      onSuccess: (newMessage) => {
        queryClient.setQueryData<Message[]>(['messages', userId], (old = []) => [
          newMessage,
          ...old,
        ]);
      },
    }
  );

  return {
    messages,
    isLoading,
    sendMessage,
  };
}