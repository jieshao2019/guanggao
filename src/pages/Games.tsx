import React from 'react';
import { Star, Users, Trophy } from 'lucide-react';

export default function Games() {
  return (
    <div className="p-4 space-y-4">
      {/* Categories */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {['全部', '动作', '益智', '策略', '休闲'].map((category) => (
          <button
            key={category}
            className="px-4 py-1 bg-white rounded-full text-sm whitespace-nowrap"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Featured Game */}
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="aspect-video bg-gray-200 relative">
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
            热门推荐
          </div>
        </div>
        <div className="p-3">
          <h2 className="font-bold">精品游戏</h2>
          <div className="flex items-center space-x-2 mt-1 text-sm text-gray-600">
            <span className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              4.8
            </span>
            <span className="flex items-center">
              <Users className="w-4 h-4 text-blue-500 mr-1" />
              10k+
            </span>
          </div>
        </div>
      </div>

      {/* Game List */}
      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4, 5, 6].map((game) => (
          <div key={game} className="bg-white rounded-lg overflow-hidden">
            <div className="aspect-video bg-gray-200"></div>
            <div className="p-2">
              <h3 className="font-medium text-sm">游戏 {game}</h3>
              <div className="flex items-center justify-between mt-1">
                <span className="flex items-center text-xs text-gray-600">
                  <Trophy className="w-3 h-3 text-yellow-500 mr-1" />
                  +50积分
                </span>
                <button className="bg-indigo-600 text-white px-2 py-1 rounded text-xs">
                  开始
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}