import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './useAuth';

interface GameSocketEvents {
  'user-joined': (data: { userId: number; username: string }) => void;
  'user-left': (data: { userId: number }) => void;
  'room-state': (data: { players: any[] }) => void;
  'status-updated': (data: { userId: number; status: string }) => void;
  'game-start': () => void;
  'game-action': (data: { userId: number; action: any }) => void;
  'game-ended': (data: { scores: Record<number, number> }) => void;
  'new-message': (data: any) => void;
  'error': (data: { message: string }) => void;
}

export function useGameSocket() {
  const { token } = useAuth();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!token) return;

    socketRef.current = io('/game', {
      auth: { token },
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      console.log('Connected to game socket');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from game socket');
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  const joinRoom = (roomId: number) => {
    socketRef.current?.emit('join-room', roomId);
  };

  const leaveRoom = (roomId: number) => {
    socketRef.current?.emit('leave-room', roomId);
  };

  const updateStatus = (roomId: number, status: string) => {
    socketRef.current?.emit('update-status', { roomId, status });
  };

  const sendGameAction = (roomId: number, action: any) => {
    socketRef.current?.emit('game-action', { roomId, action });
  };

  const sendGameOver = (roomId: number, scores: Record<number, number>) => {
    socketRef.current?.emit('game-over', { roomId, scores });
  };

  const sendMessage = (roomId: number, content: string) => {
    socketRef.current?.emit('chat-message', { roomId, content });
  };

  const on = <E extends keyof GameSocketEvents>(
    event: E,
    callback: GameSocketEvents[E]
  ) => {
    socketRef.current?.on(event, callback);
  };

  const off = <E extends keyof GameSocketEvents>(
    event: E,
    callback: GameSocketEvents[E]
  ) => {
    socketRef.current?.off(event, callback);
  };

  return {
    socket: socketRef.current,
    joinRoom,
    leaveRoom,
    updateStatus,
    sendGameAction,
    sendGameOver,
    sendMessage,
    on,
    off,
  };
}