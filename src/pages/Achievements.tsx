import React from 'react';
import { ArrowLeft, Trophy, Star, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAchievements } from '../hooks/useAchievements';

export default function Achievements() {
  const { achievements, progress, isLoading } = useAchievements();

  const getProgress = (achievement: any) => {
    if (!progress) return 0;
    
    switch (achievement.type) {
      case 'games_played':
        return progress.games_played;
      case 'total_points':
        return progress.total_points;
      case 'ads_watched':
        return progress.ads_watched;
      case 'consecutive_signin':
        return progress.consecutive_signin;
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <div className="flex items-center mb-6">
          <Link to="/profile" className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="ml-3 text-xl font-bold">成就</h1>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <Trophy className="w-6 h-6 mx-auto mb-1" />
            <p className="text-sm opacity-90">已解锁</p>
            <p className="text-xl font-bold">
              {achievements?.filter(a => a.unlocked).length || 0}
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <Star className="w-6 h-6 mx-auto mb-1" />
            <p className="text-sm opacity-90">总成就</p>
            <p className="text-xl font-bold">{achievements?.length || 0}</p>
          </div>
        </div>
      </div>

      {/* Achievements List */}
      <div className="p-4 space-y-4">
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">加载中...</div>
        ) : (
          achievements?.map((achievement) => (
            <div
              key={achievement.id}
              className={`bg-white rounded-lg p-4 ${
                achievement.unlocked ? 'border-l-4 border-green-500' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium">{achievement.title}</h3>
                    {achievement.unlocked ? (
                      <Trophy className="w-5 h-5 text-green-500" />
                    ) : (
                      <Lock className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {achievement.description}
                  </p>
                  {!achievement.unlocked && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full transition-all"
                          style={{
                            width: `${(getProgress(achievement) / achievement.requirement) * 100}%`,
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {getProgress(achievement)}/{achievement.requirement}
                      </p>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-indigo-600 font-medium">
                    +{achievement.points}
                  </span>
                  <p className="text-xs text-gray-500">积分奖励</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}