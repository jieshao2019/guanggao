import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { useSocket } from './useSocket';

interface GameRoom {
  id: number;
  gameId: number;
  name: string;
  maxPlayers: number;
  status: string;
  playerCount: number;
  messageCount: number;
  players?: {
    id: number;
    username: string;
    vipLevel: number;
    status: string;
    joinedAt: string;
  }[];
  messages?: {
    id: number;
    userId: number;
    username: string;
    content: string;
    createdAt: string;
  }[];
}

export function useGameRoom(gameId?: number, roomId?: number) {
  const queryClient = useQueryClient();
  const socket = useSocket();

  // Get rooms list
  const { data: rooms } = useQuery<GameRoom[]>(
    ['gameRooms', gameId],
    async () => {
      const { data } = await axios.get(`/api/rooms/${gameId}/rooms`);
      return data;
    },
    {
      enabled: !!gameId,
    }
  );

  // Get room details
  const { data: room } = useQuery<GameRoom>(
    ['gameRoom', roomId],
    async () => {
      const { data } = await axios.get(`/api/rooms/${roomId}`);
      return data;
    },
    {
      enabled: !!roomId,
    }
  );

  // Create room
  const createRoom = useMutation<GameRoom, unknown, { name: string; maxPlayers?: number }>(
    async ({ name, maxPlayers }) => {
      const { data } = await axios.post(`/api/rooms/${gameId}/rooms`, { name, maxPlayers });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['gameRooms', gameId]);
      },
    }
  );

  // Join room
  const joinRoom = useMutation<void>(
    async () => {
      await axios.post(`/api/rooms/${roomId}/join`);
      socket?.emit('join-room', roomId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['gameRoom', roomId]);
      },
    }
  );

  // Leave room
  const leaveRoom = useMutation<void>(
    async () => {
      await axios.post(`/api/rooms/${roomId}/leave`);
      socket?.emit('leave-room', roomId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['gameRoom', roomId]);
        queryClient.invalidateQueries(['gameRooms', gameId]);
      },
    }
  );

  // Send message
  const sendMessage = useMutation<void, unknown, string>(
    async (content) => {
      await axios.post(`/api/rooms/${roomId}/messages`, { content });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['gameRoom', roomId]);
      },
    }
  );

  return {
    rooms,
    room,
    createRoom,
    joinRoom,
    leaveRoom,
    sendMessage,
  };
}