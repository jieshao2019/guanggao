import React, { useState } from 'react';
import { Trophy, Medal, Users, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GameRanking() {
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const rankings = [
    { id: 1, username: '玩家1', score: 10000, avatar: '', rank: 1 },
    { id: 2, username: '玩家2', score: 9500, avatar: '', rank: 2 },
    { id: 3, username: '玩家3', score: 9000, avatar: '', rank: 3 },
    // ... more rankings
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
        <div className="flex items-center mb-4">
          <Link to="/games" className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="ml-3 text-xl font-bold text-white">排行榜</h1>
        </div>

        {/* Time Range Selector */}
        <div className="flex bg-white/10 rounded-lg p-1">
          {[
            { value: 'daily', label: '日榜' },
            { value: 'weekly', label: '周榜' },
            { value: 'monthly', label: '月榜' },
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setTimeRange(value as typeof timeRange)}
              className={`flex-1 py-2 text-sm rounded-md ${
                timeRange === value
                  ? 'bg-white text-indigo-600'
                  : 'text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 */}
      <div className="p-4">
        <div className="flex justify-between items-end mb-8">
          {/* Second Place */}
          <div className="text-center flex-1">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2"></div>
            <Medal className="w-6 h-6 text-gray-400 mx-auto mb-1" />
            <p className="font-medium">玩家2</p>
            <p className="text-sm text-gray-500">9500分</p>
          </div>

          {/* First Place */}
          <div className="text-center flex-1">
            <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-2"></div>
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-1" />
            <p className="font-bold">玩家1</p>
            <p className="text-sm text-gray-500">10000分</p>
          </div>

          {/* Third Place */}
          <div className="text-center flex-1">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2"></div>
            <Medal className="w-6 h-6 text-yellow-800 mx-auto mb-1" />
            <p className="font-medium">玩家3</p>
            <p className="text-sm text-gray-500">9000分</p>
          </div>
        </div>
      </div>

      {/* Rankings List */}
      <div className="bg-white rounded-t-xl">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">排行榜</h2>
            <div className="flex items-center text-sm text-gray-500">
              <Users className="w-4 h-4 mr-1" />
              {rankings.length}名玩家
            </div>
          </div>
        </div>

        <div className="divide-y">
          {rankings.slice(3).map((player, index) => (
            <div key={player.id} className="p-4 flex items-center">
              <span className="w-8 text-center font-medium text-gray-500">
                {index + 4}
              </span>
              <div className="w-10 h-10 bg-gray-200 rounded-full mx-4"></div>
              <div className="flex-1">
                <p className="font-medium">{player.username}</p>
                <p className="text-sm text-gray-500">{player.score}分</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}