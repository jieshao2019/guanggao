import React from 'react';
import { ArrowLeft, Star, Download, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GameStore() {
  const games = [
    {
      id: 1,
      name: '益智消除',
      description: '经典三消游戏，简单易上手',
      category: '休闲',
      rating: 4.8,
      downloads: '10k+',
      imageUrl: 'https://source.unsplash.com/random/800x600/?puzzle',
      price: 0,
    },
    {
      id: 2,
      name: '动作冒险',
      description: '刺激的冒险游戏体验',
      category: '动作',
      rating: 4.6,
      downloads: '5k+',
      imageUrl: 'https://source.unsplash.com/random/800x600/?adventure',
      price: 0,
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
          <h1 className="ml-3 text-xl font-bold">游戏商店</h1>
        </div>

        {/* Categories */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {['全部', '动作', '益智', '策略', '休闲'].map((category) => (
            <button
              key={category}
              className="px-4 py-1 bg-white/10 rounded-full text-sm whitespace-nowrap"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Game */}
      <div className="p-4">
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="aspect-video bg-gray-200 relative">
            <img
              src="https://source.unsplash.com/random/800x600/?game"
              alt="Featured Game"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
              精选推荐
            </div>
          </div>
          <div className="p-4">
            <h2 className="font-bold text-lg">热门游戏</h2>
            <div className="flex items-center space-x-2 mt-1 text-sm text-gray-600">
              <span className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                4.9
              </span>
              <span className="flex items-center">
                <Download className="w-4 h-4 text-blue-500 mr-1" />
                50k+
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Game List */}
      <div className="p-4 space-y-4">
        {games.map((game) => (
          <div key={game.id} className="bg-white rounded-lg overflow-hidden">
            <div className="flex">
              <div className="w-32 h-32 bg-gray-200 flex-shrink-0">
                <img
                  src={game.imageUrl}
                  alt={game.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{game.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {game.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-2 text-sm">
                      <span className="bg-gray-100 px-2 py-0.5 rounded">
                        {game.category}
                      </span>
                      <span className="flex items-center text-yellow-500">
                        <Star className="w-4 h-4 mr-1" />
                        {game.rating}
                      </span>
                    </div>
                  </div>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm">
                    开始
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <Download className="w-4 h-4 mr-1" />
                    {game.downloads}
                  </div>
                  <div className="flex items-center text-sm text-indigo-600">
                    <Gift className="w-4 h-4 mr-1" />
                    +50积分/局
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}