import React from 'react';
import { ArrowLeft, Star, Gift, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GameShop() {
  const items = [
    {
      id: 1,
      name: '道具礼包',
      description: '包含多种游戏道具',
      price: 100,
      originalPrice: 200,
      type: 'package',
      imageUrl: 'https://source.unsplash.com/random/800x600/?gift',
    },
    {
      id: 2,
      name: 'VIP会员',
      description: '解锁更多特权',
      price: 300,
      type: 'vip',
      duration: '30天',
      imageUrl: 'https://source.unsplash.com/random/800x600/?vip',
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
          <h1 className="ml-3 text-xl font-bold">游戏商城</h1>
        </div>

        <div className="flex justify-between">
          <div>
            <p className="text-sm opacity-80">我的积分</p>
            <p className="text-2xl font-bold">1,280</p>
          </div>
          <button className="bg-white/20 px-4 py-2 rounded-lg text-sm">
            充值
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="p-4">
        <div className="grid grid-cols-4 gap-4">
          {['全部', '道具', '礼包', '特权'].map((category) => (
            <button
              key={category}
              className="bg-white p-3 rounded-lg text-center text-sm"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Items */}
      <div className="p-4 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg overflow-hidden">
            <div className="aspect-video bg-gray-200 relative">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              {item.originalPrice && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                  {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                {item.type === 'vip' && (
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                    {item.duration}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 mr-1" />
                  <span className="text-xl font-bold">{item.price}</span>
                  {item.originalPrice && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      {item.originalPrice}
                    </span>
                  )}
                </div>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm">
                  购买
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}