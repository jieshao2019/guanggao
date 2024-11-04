import React from 'react';
import { Trophy } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function AdProgress() {
  const { user } = useAuth();
  const maxDailyAds = user?.vipLevel ? (user.vipLevel + 1) * 5 : 5;
  const watchedAds = user?.dailyAdViews || 0;
  const progress = (watchedAds / maxDailyAds) * 100;

  return (
    <div className="bg-white/10 rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="text-sm opacity-90">今日观看进度</h3>
          <p className="text-xs opacity-80">VIP等级 {user?.vipLevel || 0}</p>
        </div>
        <div className="text-right">
          <p className="text-sm opacity-90">{watchedAds}/{maxDailyAds}</p>
          <p className="text-xs opacity-80">次数</p>
        </div>
      </div>
      
      <div className="relative">
        <div className="h-2 bg-white/20 rounded-full">
          <div 
            className="absolute left-0 h-2 bg-white rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        {progress >= 100 && (
          <div className="absolute -right-2 -top-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
          </div>
        )}
      </div>
    </div>
  );
}