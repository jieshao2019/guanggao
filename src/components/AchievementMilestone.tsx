import React from 'react';
import { Trophy, Star } from 'lucide-react';

interface MilestoneProps {
  milestone: {
    count: number;
    title: string;
    description: string;
    points: number;
    completed: boolean;
  };
}

export default function AchievementMilestone({ milestone }: MilestoneProps) {
  return (
    <div
      className={`bg-white rounded-lg p-4 ${
        milestone.completed ? 'border-l-4 border-yellow-500' : ''
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-medium">{milestone.title}</h3>
            {milestone.completed && (
              <Trophy className="w-5 h-5 text-yellow-500" />
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">{milestone.description}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="font-medium text-yellow-500">
              +{milestone.points}
            </span>
          </div>
          <p className="text-xs text-gray-500">积分奖励</p>
        </div>
      </div>
    </div>
  );
}