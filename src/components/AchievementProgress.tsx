import React from 'react';
import { Trophy } from 'lucide-react';
import { useAchievements } from '../hooks/useAchievements';

export default function AchievementProgress() {
  const { achievements } = useAchievements();

  if (!achievements?.length) return null;

  const completedCount = achievements.filter((a) => a.completed).length;
  const totalCount = achievements.length;
  const progress = (completedCount / totalCount) * 100;

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h2 className="font-medium">成就进度</h2>
          <p className="text-sm text-gray-500">
            解锁 {completedCount}/{totalCount} 个成就
          </p>
        </div>
        <Trophy className="w-6 h-6 text-yellow-500" />
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className="bg-yellow-500 h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}