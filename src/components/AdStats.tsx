import React from 'react';
import { TrendingUp, Clock, Award } from 'lucide-react';

interface AdStatsProps {
  todayEarnings: number;
  remainingAds: number;
  totalEarnings: number;
}

export default function AdStats({ todayEarnings, remainingAds, totalEarnings }: AdStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">今日收益</p>
            <p className="text-xl font-bold mt-1">{todayEarnings}</p>
          </div>
          <TrendingUp className="w-8 h-8 text-green-500" />
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">剩余次数</p>
            <p className="text-xl font-bold mt-1">{remainingAds}</p>
          </div>
          <Clock className="w-8 h-8 text-blue-500" />
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">总收益</p>
            <p className="text-xl font-bold mt-1">{totalEarnings}</p>
          </div>
          <Award className="w-8 h-8 text-purple-500" />
        </div>
      </div>
    </div>
  );
}