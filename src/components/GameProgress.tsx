import React from 'react';
import { Trophy } from 'lucide-react';

interface GameProgressProps {
  level: number;
  experience: number;
  nextLevelExp: number;
}

export default function GameProgress({ level, experience, nextLevelExp }: GameProgressProps) {
  const progress = (experience / nextLevelExp) * 100;

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
          <span className="font-medium">等级 {level}</span>
        </div>
        <span className="text-sm text-gray-500">
          {experience}/{nextLevelExp}
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-2">
        距离下一级还需 {nextLevelExp - experience} 经验
      </p>
    </div>
  );
}