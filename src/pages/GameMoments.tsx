import React from 'react';
import { ArrowLeft, Heart, MessageCircle, Share2, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GameMoments() {
  const moments = [
    {
      id: 1,
      user: {
        name: '玩家1',
        avatar: '',
      },
      content: '今天玩游戏赢得了大奖！',
      images: ['https://source.unsplash.com/random/800x600/?game'],
      likes: 42,
      comments: 12,
      time: '2小时前',
    },
    {
      id: 2,
      user: {
        name: '玩家2',
        avatar: '',
      },
      content: '新游戏真好玩，推荐大家来试试！',
      images: [
        'https://source.unsplash.com/random/800x600/?gaming',
        'https://source.unsplash.com/random/800x600/?videogame',
      ],
      likes: 38,
      comments: 8,
      time: '3小时前',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/games" className="text-gray-600">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="ml-4 text-xl font-bold">游戏动态</h1>
          </div>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm">
            发布
          </button>
        </div>
      </div>

      {/* Moments List */}
      <div className="p-4 space-y-4">
        {moments.map((moment) => (
          <div key={moment.id} className="bg-white rounded-lg">
            {/* User Info */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <p className="font-medium">{moment.user.name}</p>
                  <p className="text-sm text-gray-500">{moment.time}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MoreVertical className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="px-4 pb-3">
              <p className="text-gray-800">{moment.content}</p>
            </div>

            {/* Images */}
            <div className="px-4 pb-4">
              <div className={`grid gap-2 ${
                moment.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
              }`}>
                {moment.images.map((image, index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`Moment ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="px-4 py-3 border-t flex items-center justify-between">
              <button className="flex items-center space-x-1 text-gray-600">
                <Heart className="w-5 h-5" />
                <span>{moment.likes}</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-600">
                <MessageCircle className="w-5 h-5" />
                <span>{moment.comments}</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-600">
                <Share2 className="w-5 h-5" />
                <span>分享</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}