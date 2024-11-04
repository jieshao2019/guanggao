import React from 'react';
import { Crown, Check, Star, Shield, Zap } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function VIP() {
  const { user } = useAuth();
  
  const vipLevels = [
    {
      level: 1,
      price: 30,
      benefits: [
        '每日观看广告次数增加至15次',
        '积分奖励1.2倍加成',
        '专属头像框',
        'VIP专属客服'
      ]
    },
    {
      level: 2,
      price: 68,
      benefits: [
        '每日观看广告次数增加至20次',
        '积分奖励1.5倍加成',
        '高级头像框',
        'VIP专属客服',
        '游戏特权道具'
      ]
    },
    {
      level: 3,
      price: 128,
      benefits: [
        '每日观看广告次数增加至30次',
        '积分奖励2倍加成',
        '豪华头像框',
        'VIP专属客服',
        '游戏特权道具',
        '提现手续费减免'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 text-white">
        <div className="flex items-center space-x-3">
          <Crown className="w-8 h-8" />
          <div>
            <h1 className="text-xl font-bold">VIP会员</h1>
            <p className="text-sm opacity-90">
              当前等级: VIP {user?.vipLevel || 0}
            </p>
          </div>
        </div>
      </div>

      {/* VIP Cards */}
      <div className="p-4 space-y-4">
        {vipLevels.map((vip) => (
          <div
            key={vip.level}
            className={`bg-white rounded-lg overflow-hidden ${
              user?.vipLevel === vip.level ? 'ring-2 ring-yellow-500' : ''
            }`}
          >
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold">VIP {vip.level}</h2>
                  <p className="text-sm opacity-90">解锁更多特权</p>
                </div>
                <span className="text-2xl font-bold">${vip.price}</span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="space-y-3">
                {vip.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <button
                className={`mt-4 w-full py-2 rounded-lg font-medium ${
                  user?.vipLevel === vip.level
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-yellow-500 text-white hover:bg-yellow-600'
                }`}
                disabled={user?.vipLevel === vip.level}
              >
                {user?.vipLevel === vip.level ? '当前等级' : '立即开通'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* VIP Benefits */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">会员特权</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <Star className="w-6 h-6 text-yellow-500 mb-2" />
            <h3 className="font-medium mb-1">积分加成</h3>
            <p className="text-sm text-gray-500">观看广告获得更多积分</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <Shield className="w-6 h-6 text-blue-500 mb-2" />
            <h3 className="font-medium mb-1">专属客服</h3>
            <p className="text-sm text-gray-500">优先处理问题</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <Zap className="w-6 h-6 text-purple-500 mb-2" />
            <h3 className="font-medium mb-1">特权道具</h3>
            <p className="text-sm text-gray-500">游戏专属道具</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <Crown className="w-6 h-6 text-yellow-500 mb-2" />
            <h3 className="font-medium mb-1">专属标识</h3>
            <p className="text-sm text-gray-500">彰显尊贵身份</p>
          </div>
        </div>
      </div>
    </div>
  );
}