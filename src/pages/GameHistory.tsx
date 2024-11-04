import React from 'react';
import { ArrowLeft, Clock, Trophy, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default function GameHistory() {
  const history = [
    {
      id: 1,
      gameName: '游戏1',
      score: 1000,
      duration: '10分钟',
      playedAt: new Date(),
      rewards: 50,
    },
    // ... more history
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white">
        <div className="px-4 py-3 flex items-center">
          <Link to="/profile" className="text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="ml-4 text-xl font-bold">游戏记录</h1>
        </div>
      </div>

      {/* Stats */}
      <div className="p-4 grid grid-cols-3 gap-4">
        <div className="bg-white p-3 rounded-lg text-center">
          <Clock className="w-6 h-6 text-blue-500 mx-auto mb-1" />
          <p className="text-xl font-bold">32h</p>
          <p className="text-xs text-gray-600">总时长</p>
        </div>
        <div className="bg-white p-3 rounded-lg text-center">
          <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
          <p className="text-xl font-bold">1500</p>
          <p className="text-xs text-gray-600">最高分</p>
        </div>
        <div className="bg-white p-3 rounded-lg text-center">
          <Star className="w-6 h-6 text-purple-500 mx-auto mb-1" />
          <p className="text-xl font-bold">15</p>
          <p className="text-xs text-gray-600">游戏数</p>
        </div>
      </div>

      {/* History List */}
      <div className="p-4">
        <div className="bg-white rounded-lg">
          <div className="p-4 border-b">
            <h2 className="font-bold">游戏记录</h2>
          </div>
          <div className="divide-y">
            {history.map((record) => (
              <div key={record.id} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{record.gameName}</h3>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-sm text-gray-500 flex items-center">
                        <Trophy className="w-4 h-4 mr-1" />
                        {record.score}分
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {record.duration}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">
                      {format(record.playedAt, 'MM-dd HH:mm')}
                    </span>
                    <p className="text-sm text-indigo-600 mt-1">
                      +{record.rewards}积分
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}