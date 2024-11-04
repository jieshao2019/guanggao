import React from 'react';
import { ArrowLeft, Star, Trophy, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GameRules() {
  const rules = [
    {
      title: '基本规则',
      items: [
        '每局游戏时长为3分钟',
        '根据得分获得相应积分奖励',
        '每日游戏次数不限',
        'VIP用户可获得额外积分加成'
      ]
    },
    {
      title: '积分规则',
      items: [
        '基础分数：每1000分=10积分',
        'VIP加成：VIP1=20%，VIP2=50%，VIP3=100%',
        '连胜加成：每连胜1局额外10%加成',
        '首胜加成：每日首次获胜额外50积分'
      ]
    },
    {
      title: '特殊奖励',
      items: [
        '达到指定分数可获得成就奖励',
        '参与排行榜可获得额外奖励',
        '邀请好友一起玩可获得奖励',
        '完成每日任务可获得额外积分'
      ]
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
          <h1 className="ml-3 text-xl font-bold">游戏规则</h1>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4 grid grid-cols-3 gap-4">
        <div className="bg-white p-3 rounded-lg text-center">
          <Clock className="w-6 h-6 text-blue-500 mx-auto mb-1" />
          <p className="text-xl font-bold">3分钟</p>
          <p className="text-xs text-gray-600">游戏时长</p>
        </div>
        <div className="bg-white p-3 rounded-lg text-center">
          <Star className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
          <p className="text-xl font-bold">不限</p>
          <p className="text-xs text-gray-600">游戏次数</p>
        </div>
        <div className="bg-white p-3 rounded-lg text-center">
          <Trophy className="w-6 h-6 text-purple-500 mx-auto mb-1" />
          <p className="text-xl font-bold">100%</p>
          <p className="text-xs text-gray-600">最高加成</p>
        </div>
      </div>

      {/* Rules */}
      <div className="p-4 space-y-4">
        {rules.map((section, index) => (
          <div key={index} className="bg-white rounded-lg">
            <div className="p-4 border-b">
              <h2 className="font-bold">{section.title}</h2>
            </div>
            <div className="p-4">
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-2"></div>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}