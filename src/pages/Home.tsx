import React from 'react';
import { Trophy, Star, TrendingUp, Gift, Calendar, ChevronRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import OnlineFriends from '../components/OnlineFriends';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-full"></div>
          <div>
            <h1 className="text-xl font-bold">{user?.username || '游客'}</h1>
            <p className="text-sm opacity-90">VIP {user?.vipLevel || 0} 会员</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-sm opacity-90">今日可观看</p>
            <p className="text-xl font-bold">8/10</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-sm opacity-90">积分余额</p>
            <p className="text-xl font-bold">{user?.points || 0}</p>
          </div>
        </div>
      </div>

      {/* Online Friends */}
      <OnlineFriends />

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-2 p-4">
        <div className="bg-white p-3 rounded-lg text-center">
          <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
          <p className="text-xl font-bold">1200</p>
          <p className="text-xs text-gray-600">总积分</p>
        </div>
        <div className="bg-white p-3 rounded-lg text-center">
          <Star className="w-6 h-6 text-blue-500 mx-auto mb-1" />
          <p className="text-xl font-bold">5</p>
          <p className="text-xs text-gray-600">已玩游戏</p>
        </div>
        <div className="bg-white p-3 rounded-lg text-center">
          <Calendar className="w-6 h-6 text-green-500 mx-auto mb-1" />
          <p className="text-xl font-bold">3</p>
          <p className="text-xs text-gray-600">连续签到</p>
        </div>
      </div>

      {/* Daily Tasks */}
      <div className="p-4">
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="font-bold">每日任务</h2>
              <span className="text-sm text-gray-500">3/5 已完成</span>
            </div>
          </div>
          <div className="divide-y">
            {[
              { title: '观看广告', reward: 30, progress: 8, total: 10 },
              { title: '玩游戏', reward: 50, progress: 2, total: 5 },
              { title: '分享游戏', reward: 20, progress: 1, total: 3 },
            ].map((task, index) => (
              <div key={index} className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-3">
                    <Gift className="w-5 h-5 text-indigo-600" />
                    <div>
                      <h3 className="font-medium">{task.title}</h3>
                      <p className="text-sm text-gray-500">
                        {task.progress}/{task.total}
                      </p>
                    </div>
                  </div>
                  <span className="text-indigo-600 font-medium">+{task.reward}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all"
                    style={{ width: `${(task.progress / task.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Games */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-lg">最近游戏</h2>
          <button className="text-indigo-600 text-sm flex items-center">
            查看全部
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((game) => (
            <div key={game} className="bg-white rounded-lg overflow-hidden">
              <div className="aspect-video bg-gray-200"></div>
              <div className="p-2">
                <h3 className="font-medium text-sm">游戏 {game}</h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500">2小时前</span>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                    +50积分
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}