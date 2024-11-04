import React from 'react';
import { useGameProgress } from '../hooks/useGameProgress';

interface GameProgressBarProps {
  gameId: number;
}

export default function GameProgressBar({ gameId }: GameProgressBarProps) {
  const { progress } = useGameProgress(gameId);

  if (!progress) return null;

  const nextLevelExp = progress.level * 1000; // Example: each level requires level * 1000 exp
  const progressPercent = (progress.experience / nextLevelExp) * 100;

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <div>
          <p className="text-sm text-gray-600">等级 {progress.level}</p>
          <p className="text-xs text-gray-500">
            {progress.experience}/{nextLevelExp} 经验
          </p>
        </div>
        {progress.buffs.length > 0 && (
          <div className="flex items-center space-x-1">
            {progress.buffs.map((buff) => (
              <span
                key={buff.id}
                className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs"
              >
                {buff.multiplier}x
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}