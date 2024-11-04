import React from 'react';
import { Trophy, Lock, Star } from 'lucide-react';

interface AchievementCardProps {
  achievement: {
    id: number;
    title: string;
    description: string;
    requirement: number;
    points: number;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    icon?: string;
    progress?: number;
    completed?: boolean;
    completedAt?: string;
    rewards: {
      type: string;
      value: string;
    }[];
  };
}

export default function AchievementCard({ achievement }: AchievementCardProps) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'text-yellow-500 bg-yellow-100';
      case 'epic':
        return 'text-purple-600 bg-purple-100';
      case 'rare':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getRarityText = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return '传说';
      case 'epic':
        return '史诗';
      case 'rare':
        return '稀有';
      default:
        return '普通';
    }
  };

  return (
    <div
      className={`bg-white rounded-lg p-4 ${
        achievement.completed ? 'border-l-4 border-green-500' : ''
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-medium">{achievement.title}</h3>
            {achievement.completed ? (
              <Trophy className="w-5 h-5 text-green-500" />
            ) : (
              <Lock className="w-5 h-5 text-gray-400" />
            )}
            <span
              className={`px-2 py-0.5 rounded-full text-xs ${getRarityColor(
                achievement.rarity
              )}`}
            >
              {getRarityText(achievement.rarity)}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">{achievement.description}</p>

          {!achievement.completed && achievement.progress !== undefined && (
            <div className="mt-2">
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${Math.min(
                      100,
                      (achievement.progress / achievement.requirement) * 100
                    )}%`,
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {achievement.progress}/{achievement.requirement}
              </p>
            </div>
          )}

          {achievement.rewards.length > 0 && (
            <div className="flex items-center space-x-2 mt-2">
              {achievement.rewards.map((reward, index) => (
                <div
                  key={index}
                  className="flex items-center px-2 py-1 bg-gray-100 rounded text-xs text-gray-600"
                >
                  {reward.type === 'points' ? (
                    <>
                      <Star className="w-3 h-3 mr-1" />
                      {reward.value}
                    </>
                  ) : (
                    reward.value
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-right">
          <span className="text-indigo-600 font-medium">
            +{achievement.points}
          </span>
          <p className="text-xs text-gray-500">积分奖励</p>
          {achievement.completedAt && (
            <p className="text-xs text-gray-400 mt-1">
              {new Date(achievement.completedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}