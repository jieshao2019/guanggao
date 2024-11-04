import React from 'react';
import { ArrowLeft, Trophy, Lock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GameAchievements() {
  const achievements = [
    {
      id: 1,
      title: '初出茅庐',
      description: '完成第一次游戏',
      reward: 100,
      completed: true,
      progress: 1,
      total: 1,
    },
    {
      id: 2,
      title: '游戏达人',
      description: '累计游戏时长达到10小时',
      reward: 500,
      completed: false,
      progress: 6,
      total: 10,
    },
    // ... more achievements
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white">
        <div className="px-4 py-3 flex items-center">
          <Link to="/profile" className="text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="ml-4 text-xl font-bold">成就</h1>
        </div>
      </div>

      {/* Achievement Stats */}
      <div className="p-4 bg-white mt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold">成就进度</h2>
            <p className="text-sm text-gray-500 mt-1">
              已完成 {achievements.filter(a => a.completed).length}/{achievements.length}
            </p>
          </div>
          <Trophy className="w-8 h-8 text-yellow-500" />
        </div>
      </div>

      {/* Achievement List */}
      <div className="p-4 space-y-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`bg-white rounded-lg p-4 ${
              achievement.completed ? 'border-l-4 border-green-500' : ''
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">{achievement.title}</h3>
                  {achievement.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Lock className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {achievement.description}
                </p>
                {!achievement.completed && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all"
                        style={{
                          width: `${(achievement.progress / achievement.total) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {achievement.progress}/{achievement.total}
                    </p>
                  </div>
                )}
              </div>
              <div className="text-right">
                <span className="text-indigo-600 font-medium">
                  +{achievement.reward}
                </span>
                <p className="text-xs text-gray-500">积分奖励</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}