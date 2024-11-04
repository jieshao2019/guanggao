import React from 'react';
import { Trophy, Clock } from 'lucide-react';

interface GameHUDProps {
  scores: Record<number, number>;
  timeLeft: number;
  players: {
    id: number;
    username: string;
  }[];
}

export default function GameHUD({ scores, timeLeft, players }: GameHUDProps) {
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="absolute top-0 left-0 right-0 p-4">
      {/* Timer */}
      <div className="flex justify-center mb-4">
        <div className="bg-black/50 text-white px-4 py-2 rounded-full flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          <span className="font-medium">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Scores */}
      <div className="flex justify-between">
        {players.map((player) => (
          <div
            key={player.id}
            className="bg-black/50 text-white px-4 py-2 rounded-full flex items-center"
          >
            <Trophy className="w-5 h-5 mr-2" />
            <span className="font-medium">{player.username}:</span>
            <span className="ml-2">{scores[player.id] || 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
}