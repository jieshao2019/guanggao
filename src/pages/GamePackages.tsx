import React from 'react';
import { ArrowLeft, Gift, Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GamePackages() {
  const packages = [
    {
      id: 1,
      name: '新手礼包',
      description: '包含游戏道具和积分奖励',
      price: 0,
      items: [
        { name: '游戏道具', quantity: 5 },
        { name: '积分', quantity: 1000 },
      ],
      timeLimit: '7天',
      imageUrl: 'https://source.unsplash.com/random/800x600/?gift',
    },
    {
      id: 2,
      name: 'VIP礼包',
      description: 'VIP专属特权礼包',
      price: 100,
      items: [
        { name: '高级道具', quantity: 10 },
        { name: '积分', quantity: 2000 },
        { name: 'VIP体验卡', quantity: 1 },
      ],
      timeLimit: '30天',
      imageUrl: 'https://source.unsplash.com/random/800x600/?premium',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
        <div className="flex items-center mb-4">
          <Link to="/games" className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="ml-3 text-xl font-bold">礼包中心</h1>
        </div>
      </div>

      {/* Packages List */}
      <div className="p-4 space-y-4">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-lg overflow-hidden">
            <div className="aspect-video bg-gray-200 relative">
              <img
                src={pkg.imageUrl}
                alt={pkg.name}
                className="w-full h-full object-cover"
              />
              {pkg.price === 0 && (
                <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                  免费
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg">{pkg.name}</h3>
                  <p className="text-sm text-gray-600">{pkg.description}</p>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-500">
                    剩余{pkg.timeLimit}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {pkg.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{item.name}</span>
                    <span className="text-sm text-indigo-600">x{item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  {pkg.price > 0 ? (
                    <>
                      <Star className="w-5 h-5 text-yellow-500 mr-1" />
                      <span className="font-bold">{pkg.price}</span>
                    </>
                  ) : (
                    <span className="text-green-500 font-medium">免费领取</span>
                  )}
                </div>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm">
                  立即获取
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}</content>