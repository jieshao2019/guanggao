import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './useAuth';

export function useSocket() {
  const { token } = useAuth();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!token) return;

    socketRef.current = io('http://localhost:3000', {
      auth: {
        token,
      },
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  return socketRef.current;
}