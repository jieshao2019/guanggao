import React from 'react';
import { Star, Users, Trophy } from 'lucide-react';

interface GameCardProps {
  game: {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    players: number;
    rating: number;
    pointsPerPlay: number;
  };
  onPlay?: () => void;
}

export default function GameCard({ game, onPlay }: GameCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      <div className="aspect-video bg-gray-200 relative">
        <img
          src={game.imageUrl}
          alt={game.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <h3 className="font-medium mb-1">{game.title}</h3>
        <p className="text-xs text-gray-500 line-clamp-1">
          {game.description}
        </p>
        <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
          <div className="flex items-center space-x-2">
            <span className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              {game.rating}
            </span>
            <span className="flex items-center">
              <Users className="w-4 h-4 text-blue-500 mr-1" />
              {game.players}
            </span>
          </div>
          <span className="flex items-center text-indigo-600">
            <Trophy className="w-4 h-4 mr-1" />
            +{game.pointsPerPlay}
          </span>
        </div>
        {onPlay && (
          <button
            onClick={onPlay}
            className="w-full mt-3 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium"
          >
            开始游戏
          </button>
        )}
      </div>
    </div>
  );
}