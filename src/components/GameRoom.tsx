import React, { useEffect, useState } from 'react';
import { useGameSocket } from '../hooks/useGameSocket';
import { useAuth } from '../hooks/useAuth';
import GameRoomChat from './GameRoomChat';
import GameRoomPlayers from './GameRoomPlayers';
import GameCanvas from './GameCanvas';

interface GameRoomProps {
  roomId: number;
  onClose: () => void;
}

export default function GameRoom({ roomId, onClose }: GameRoomProps) {
  const { user } = useAuth();
  const gameSocket = useGameSocket();
  const [players, setPlayers] = useState<any[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    // Join room
    gameSocket.joinRoom(roomId);

    // Listen for events
    gameSocket.on('room-state', ({ players }) => {
      setPlayers(players);
    });

    gameSocket.on('user-joined', ({ userId, username }) => {
      setPlayers(prev => [...prev, { id: userId, username, status: 'waiting' }]);
    });

    gameSocket.on('user-left', ({ userId }) => {
      setPlayers(prev => prev.filter(p => p.id !== userId));
    });

    gameSocket.on('status-updated', ({ userId, status }) => {
      setPlayers(prev =>
        prev.map(p =>
          p.id === userId ? { ...p, status } : p
        )
      );
    });

    gameSocket.on('game-start', () => {
      setGameStarted(true);
    });

    gameSocket.on('game-ended', ({ scores }) => {
      setGameStarted(false);
      // Handle game end
    });

    return () => {
      gameSocket.leaveRoom(roomId);
    };
  }, [roomId]);

  const handleReady = () => {
    gameSocket.updateStatus(roomId, 'ready');
  };

  const handleGameAction = (action: any) => {
    gameSocket.sendGameAction(roomId, action);
  };

  const handleGameOver = (scores: Record<number, number>) => {
    gameSocket.sendGameOver(roomId, scores);
  };

  return (
    <div className="fixed inset-0 bg-gray-100 z-50 flex">
      <div className="flex-1 flex flex-col">
        {/* Game Area */}
        <div className="flex-1 bg-white">
          {gameStarted ? (
            <GameCanvas
              players={players}
              onAction={handleGameAction}
              onGameOver={handleGameOver}
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-xl font-bold mb-4">等待玩家准备</h2>
                <button
                  onClick={handleReady}
                  disabled={players.find(p => p.id === user?.id)?.status === 'ready'}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
                >
                  准备
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Chat Area */}
        <div className="h-64 border-t">
          <GameRoomChat roomId={roomId} />
        </div>
      </div>

      {/* Players List */}
      <div className="w-64 border-l bg-white">
        <GameRoomPlayers players={players} />
      </div>
    </div>
  );
}