import React from 'react';
import { Crown, User } from 'lucide-react';

interface GameRoomPlayersProps {
  players: {
    id: number;
    username: string;
    vipLevel: number;
    status: string;
  }[];
}

export default function GameRoomPlayers({ players }: GameRoomPlayersProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-bold">玩家列表</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {players.map((player, index) => (
          <div
            key={player.id}
            className="p-4 flex items-center space-x-3 border-b"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-400" />
              </div>
              {index === 0 && (
                <Crown className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-medium">{player.username}</span>
                {player.vipLevel > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                    VIP {player.vipLevel}
                  </span>
                )}
              </div>
              <span className={`text-xs ${
                player.status === 'ready'
                  ? 'text-green-600'
                  : 'text-gray-500'
              }`}>
                {player.status === 'ready' ? '已准备' : '未准备'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}