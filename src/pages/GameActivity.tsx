import React from 'react';
import { ArrowLeft, Trophy, Star, Clock, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GameActivity() {
  const activities = [
    {
      id: 1,
      title: '每日签到',
      description: '连续签到7天可获得额外奖励',
      progress: 5,
      total: 7,
      reward: 50,
      type: 'daily',
    },
    {
      id: 2,
      title: '观看广告',
      description: '观看广告获取积分奖励',
      progress: 8,
      total: 10,
      reward: 30,
      type: 'daily',
    },
    {
      id: 3,
      title: '游戏达人',
      description: '累计游戏时长达到1小时',
      progress: 45,
      total: 60,
      reward: 100,
      type: 'achievement',
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <div className="flex items-center mb-6">
          <Link to="/games" className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="ml-3 text-xl font-bold">每日任务</h1>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <Trophy className="w-6 h-6 mx-auto mb-1" />
            <p className="text-sm">今日积分</p>
            <p className="text-xl font-bold">280</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <Star className="w-6 h-6 mx-auto mb-1" />
            <p className="text-sm">任务完成</p>
            <p className="text-xl font-bold">5/8</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <Clock className="w-6 h-6 mx-auto mb-1" />
            <p className="text-sm">剩余时间</p>
            <p className="text-xl font-bold">4h</p>
          </div>
        </div>
      </div>

      {/* Activities List */}
      <div className="p-4 space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-white rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold">{activity.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {activity.description}
                </p>
              </div>
              <div className="flex items-center text-indigo-600">
                <Gift className="w-5 h-5 mr-1" />
                <span>+{activity.reward}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  进度：{activity.progress}/{activity.total}
                </span>
                <span className="text-gray-500">
                  {Math.round((activity.progress / activity.total) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${(activity.progress / activity.total) * 100}%`,
                  }}
                />
              </div>
            </div>

            <button
              className={`w-full mt-4 py-2 rounded-lg font-medium ${
                activity.progress >= activity.total
                  ? 'bg-gray-100 text-gray-400'
                  : 'bg-indigo-600 text-white'
              }`}
              disabled={activity.progress >= activity.total}
            >
              {activity.progress >= activity.total ? '已完成' : '去完成'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}