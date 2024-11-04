import React from 'react';
import { Users, MessageCircle } from 'lucide-react';
import { useGameRoom } from '../hooks/useGameRoom';

interface GameRoomListProps {
  gameId: number;
  onJoin: (roomId: number) => void;
}

export default function GameRoomList({ gameId, onJoin }: GameRoomListProps) {
  const { rooms, createRoom } = useGameRoom(gameId);

  const handleCreateRoom = async () => {
    try {
      const room = await createRoom.mutateAsync({
        name: '新游戏房间',
        maxPlayers: 4,
      });
      onJoin(room.id);
    } catch (error) {
      console.error('Create room error:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold">游戏房间</h2>
        <button
          onClick={handleCreateRoom}
          disabled={createRoom.isLoading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50"
        >
          创建房间
        </button>
      </div>

      <div className="space-y-3">
        {rooms?.map((room) => (
          <div
            key={room.id}
            className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between"
          >
            <div>
              <h3 className="font-medium">{room.name}</h3>
              <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {room.playerCount}/{room.maxPlayers}
                </span>
                <span className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {room.messageCount}
                </span>
              </div>
            </div>
            <button
              onClick={() => onJoin(room.id)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
            >
              加入
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}