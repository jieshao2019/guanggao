import React from 'react';
import { ArrowLeft, Edit2, Settings, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function UserProfile() {
  const { user } = useAuth();

  const stats = [
    { label: '积分', value: user?.points || 0 },
    { label: '关注', value: 128 },
    { label: '粉丝', value: 256 },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <div className="flex justify-between items-start">
          <Link to="/" className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex space-x-2">
            <button className="p-2 hover:bg-white/10 rounded-full">
              <Share2 className="w-6 h-6" />
            </button>
            <Link to="/settings" className="p-2 hover:bg-white/10 rounded-full">
              <Settings className="w-6 h-6" />
            </Link>
          </div>
        </div>

        <div className="mt-6 flex items-center">
          <div className="relative">
            <div className="w-20 h-20 bg-white/20 rounded-full"></div>
            <button className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full">
              <Edit2 className="w-4 h-4 text-indigo-600" />
            </button>
          </div>
          <div className="ml-4">
            <h1 className="text-xl font-bold">{user?.username}</h1>
            <p className="text-sm opacity-90">ID: {user?.id}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-sm opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Game Stats */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="font-bold mb-3">游戏统计</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-xl font-bold">32</p>
              <p className="text-sm text-gray-500">游戏场次</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">12h</p>
              <p className="text-sm text-gray-500">游戏时长</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">8</p>
              <p className="text-sm text-gray-500">获得成就</p>
            </div>
          </div>
        </div>

        {/* Recent Games */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold">最近游戏</h2>
            <Link to="/games/history" className="text-sm text-indigo-600">
              查看全部
            </Link>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((game) => (
              <div key={game} className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                <div className="flex-1">
                  <h3 className="font-medium">游戏 {game}</h3>
                  <p className="text-sm text-gray-500">2小时前玩过</p>
                </div>
                <span className="text-sm text-indigo-600">+50分</span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold">游戏成就</h2>
            <Link to="/achievements" className="text-sm text-indigo-600">
              查看全部
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((achievement) => (
              <div key={achievement} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}