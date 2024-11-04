import React from 'react';
import { ArrowLeft, Play, Book, Star, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GameTutorial() {
  const tutorials = [
    {
      id: 1,
      title: '新手入门',
      description: '了解游戏基本操作和规则',
      duration: '5分钟',
      level: '初级',
      videoUrl: 'https://example.com/tutorial1.mp4',
    },
    {
      id: 2,
      title: '进阶技巧',
      description: '掌握高级游戏策略',
      duration: '8分钟',
      level: '中级',
      videoUrl: 'https://example.com/tutorial2.mp4',
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
        <div className="flex items-center mb-4">
          <Link to="/games" className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="ml-3 text-xl font-bold">游戏教程</h1>
        </div>
      </div>

      {/* Tutorial List */}
      <div className="p-4 space-y-4">
        {tutorials.map((tutorial) => (
          <div key={tutorial.id} className="bg-white rounded-lg overflow-hidden">
            <div className="aspect-video bg-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-white" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg">{tutorial.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {tutorial.description}
                  </p>
                </div>
                <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm">
                  {tutorial.level}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-3">
                <Book className="w-4 h-4 mr-1" />
                <span>{tutorial.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Tips */}
      <div className="p-4">
        <h2 className="font-bold text-lg mb-3">快速提示</h2>
        <div className="bg-white rounded-lg p-4">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-medium">新手技巧</h3>
                <p className="text-sm text-gray-600 mt-1">
                  建议从简单难度开始，熟悉基本操作
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">游戏提示</h3>
                <p className="text-sm text-gray-600 mt-1">
                  完成每日任务可以获得额外奖励
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}