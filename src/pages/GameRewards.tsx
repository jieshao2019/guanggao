import React from 'react';
import { ArrowLeft, Gift, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GameRewards() {
  const rewards = [
    {
      id: 1,
      title: '每日签到奖励',
      description: '连续签到7天可获得额外奖励',
      progress: 5,
      total: 7,
      rewards: [
        { day: 1, item: '积分 x100' },
        { day: 3, item: '道具礼包' },
        { day: 7, item: 'VIP体验卡' },
      ],
      status: 'available',
    },
    {
      id: 2,
      title: '新手任务',
      description: '完成新手任务获得丰厚奖励',
      progress: 3,
      total: 5,
      rewards: [
        { task: '完成新手教程', reward: '积分 x200' },
        { task: '完成首次游戏', reward: '道具礼包' },
      ],
      status: 'in_progress',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <div className="flex items-center mb-6">
          <Link to="/games" className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="ml-3 text-xl font-bold">奖励中心</h1>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <Gift className="w-6 h-6 mx-auto mb-1" />
            <p className="text-sm">可领取</p>
            <p className="text-xl font-bold">3</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <Clock className="w-6 h-6 mx-auto mb-1" />
            <p className="text-sm">即将过期</p>
            <p className="text-xl font-bold">1</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <ChevronRight className="w-6 h-6 mx-auto mb-1" />
            <p className="text-sm">进行中</p>
            <p className="text-xl font-bold">2</p>
          </div>
        </div>
      </div>

      {/* Rewards List */}
      <div className="p-4 space-y-4">
        {rewards.map((reward) => (
          <div key={reward.id} className="bg-white rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold">{reward.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {reward.description}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                reward.status === 'available'
                  ? 'bg-green-100 text-green-600'
                  : 'bg-yellow-100 text-yellow-600'
              }`}>
                {reward.status === 'available' ? '可领取' : '进行中'}
              </span>
            </div>

            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  进度：{reward.progress}/{reward.total}
                </span>
                <span className="text-gray-500">
                  {Math.round((reward.progress / reward.total) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${(reward.progress / reward.total) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {reward.rewards.map((item, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg text-center ${
                    index < reward.progress
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'bg-gray-50 text-gray-500'
                  }`}
                >
                  <p className="text-sm font-medium">
                    {item.day ? `第${item.day}天` : item.task}
                  </p>
                  <p className="text-xs mt-1">
                    {item.reward || item.item}
                  </p>
                </div>
              ))}
            </div>

            <button
              className={`w-full mt-4 py-2 rounded-lg font-medium ${
                reward.status === 'available'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-400'
              }`}
              disabled={reward.status !== 'available'}
            >
              {reward.status === 'available' ? '立即领取' : '进行中'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}</content>