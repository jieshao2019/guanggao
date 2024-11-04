import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, Trophy, Search } from 'lucide-react';

export default function GameList() {
  const games = [
    {
      id: 1,
      title: '益智消除',
      description: '经典三消游戏，简单易上手',
      imageUrl: 'https://source.unsplash.com/random/800x600/?puzzle',
      players: 1000,
      rating: 4.8,
      pointsPerPlay: 50,
    },
    {
      id: 2,
      title: '动作冒险',
      description: '刺激的冒险游戏体验',
      imageUrl: 'https://source.unsplash.com/random/800x600/?adventure',
      players: 800,
      rating: 4.6,
      pointsPerPlay: 80,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="搜索游戏..."
            className="w-full pl-10 pr-4 py-2 bg-white/10 text-white placeholder-white/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>

        {/* Categories */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {['全部', '动作', '益智', '策略', '休闲'].map((category) => (
            <button
              key={category}
              className="px-4 py-1 bg-white/10 text-white rounded-full text-sm whitespace-nowrap"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Game Grid */}
      <div className="p-4 grid grid-cols-2 gap-4">
        {games.map((game) => (
          <Link
            key={game.id}
            to={`/games/${game.id}`}
            className="bg-white rounded-lg overflow-hidden shadow-sm"
          >
            <div className="aspect-video bg-gray-200 relative">
              <img
                src={game.imageUrl}
                alt={game.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <h3 className="font-medium mb-1">{game.title}</h3>
              <p className="text-xs text-gray-500 line-clamp-1">
                {game.description}
              </p>
              <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
                <div className="flex items-center space-x-2">
                  <span className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    {game.rating}
                  </span>
                  <span className="flex items-center">
                    <Users className="w-4 h-4 text-blue-500 mr-1" />
                    {game.players}
                  </span>
                </div>
                <span className="flex items-center text-indigo-600">
                  <Trophy className="w-4 h-4 mr-1" />
                  +{game.pointsPerPlay}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="fixed bottom-20 left-0 right-0 bg-white border-t px-4 py-2 flex justify-around">
        <Link
          to="/games/rank"
          className="flex flex-col items-center text-gray-600"
        >
          <Trophy className="w-6 h-6" />
          <span className="text-xs mt-1">排行榜</span>
        </Link>
        <Link
          to="/games/activity"
          className="flex flex-col items-center text-gray-600"
        >
          <Star className="w-6 h-6" />
          <span className="text-xs mt-1">活动</span>
        </Link>
        <Link
          to="/games/rewards"
          className="flex flex-col items-center text-gray-600"
        >
          <Gift className="w-6 h-6" />
          <span className="text-xs mt-1">奖励</span>
        </Link>
      </div>
    </div>
  );
}