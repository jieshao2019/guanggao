import React from 'react';
import { Trophy, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GameResultProps {
  scores: Record<number, number>;
  players: {
    id: number;
    username: string;
    vipLevel: number;
  }[];
  rewards: {
    points: number;
    achievements?: {
      id: number;
      title: string;
      points: number;
    }[];
  };
  onPlayAgain: () => void;
}

export default function GameResult({ scores, players, rewards, onPlayAgain }: GameResultProps) {
  const navigate = useNavigate();
  const sortedPlayers = [...players].sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0));
  const winner = sortedPlayers[0];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        {/* Winner */}
        <div className="text-center mb-8">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-2" />
          <h2 className="text-2xl font-bold">游戏结束</h2>
          <p className="text-gray-600 mt-1">
            {winner.username} 获胜！
          </p>
        </div>

        {/* Scores */}
        <div className="space-y-4 mb-8">
          {sortedPlayers.map((player, index) => (
            <div
              key={player.id}
              className={`flex items-center justify-between p-4 rounded-lg ${
                index === 0 ? 'bg-yellow-50' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium">{player.username}</p>
                  {player.vipLevel > 0 && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                      VIP {player.vipLevel}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-xl font-bold">{scores[player.id] || 0}</span>
            </div>
          ))}
        </div>

        {/* Rewards */}
        <div className="bg-indigo-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">获得奖励</h3>
            <div className="flex items-center text-indigo-600">
              <Star className="w-5 h-5 mr-1" />
              <span>+{rewards.points}</span>
            </div>
          </div>
          {rewards.achievements?.map((achievement) => (
            <div
              key={achievement.id}
              className="flex items-center justify-between mt-2 text-sm"
            >
              <span className="text-gray-600">{achievement.title}</span>
              <span className="text-indigo-600">+{achievement.points}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex space-x-4">
          <button
            onClick={onPlayAgain}
            className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700"
          >
            再来一局
          </button>
          <button
            onClick={() => navigate('/games')}
            className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg font-medium hover:bg-gray-200"
          >
            返回大厅
          </button>
        </div>
      </div>
    </div>
  );
}