import React from 'react';
import { Trophy, Clock, Star } from 'lucide-react';

interface GameStatsProps {
  stats: {
    gamesPlayed: number;
    totalTime: string;
    highScore: number;
    achievements: number;
  };
}

export default function GameStats({ stats }: GameStatsProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-white p-3 rounded-lg text-center">
        <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
        <p className="text-xl font-bold">{stats.gamesPlayed}</p>
        <p className="text-xs text-gray-600">游戏场次</p>
      </div>
      <div className="bg-white p-3 rounded-lg text-center">
        <Clock className="w-6 h-6 text-blue-500 mx-auto mb-1" />
        <p className="text-xl font-bold">{stats.totalTime}</p>
        <p className="text-xs text-gray-600">游戏时长</p>
      </div>
      <div className="bg-white p-3 rounded-lg text-center">
        <Star className="w-6 h-6 text-purple-500 mx-auto mb-1" />
        <p className="text-xl font-bold">{stats.highScore}</p>
        <p className="text-xs text-gray-600">最高分</p>
      </div>
      <div className="bg-white p-3 rounded-lg text-center">
        <Trophy className="w-6 h-6 text-green-500 mx-auto mb-1" />
        <p className="text-xl font-bold">{stats.achievements}</p>
        <p className="text-xs text-gray-600">获得成就</p>
      </div>
    </div>
  );
}