import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Trophy, Users, Share2, Heart, MessageCircle, Play } from 'lucide-react';

export default function GameDetail() {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);

  const game = {
    id,
    title: '示例游戏',
    description: '这是一个精彩刺激的游戏，玩家需要通过各种挑战来获得积分奖励。游戏难度适中，适合所有年龄段的玩家。',
    rating: 4.8,
    players: 10000,
    pointsPerPlay: 50,
    imageUrl: 'https://source.unsplash.com/random/800x600/?game',
    comments: [
      { id: 1, user: '玩家1', content: '非常好玩的游戏！', rating: 5, time: '2小时前' },
      { id: 2, user: '玩家2', content: '画面精美，操作流畅', rating: 4, time: '3小时前' },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Game Preview */}
      <div className="relative">
        <img
          src={game.imageUrl}
          alt={game.title}
          className="w-full aspect-video object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
          <div className="p-4 text-white">
            <h1 className="text-2xl font-bold mb-2">{game.title}</h1>
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                {game.rating}
              </span>
              <span className="flex items-center">
                <Users className="w-4 h-4 text-blue-500 mr-1" />
                {game.players}+
              </span>
              <span className="flex items-center">
                <Trophy className="w-4 h-4 text-green-500 mr-1" />
                +{game.pointsPerPlay}积分
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 bg-white">
        <div className="flex space-x-2">
          <button className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2">
            <Play className="w-5 h-5" />
            <span>开始游戏</span>
          </button>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-3 rounded-lg ${
              isLiked ? 'text-red-500 bg-red-50' : 'text-gray-400 bg-gray-50'
            }`}
          >
            <Heart className="w-6 h-6" />
          </button>
          <button className="p-3 rounded-lg text-gray-400 bg-gray-50">
            <Share2 className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Game Info */}
      <div className="p-4 space-y-4">
        {/* Description */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="font-bold mb-2">游戏介绍</h2>
          <p className="text-gray-600 text-sm">{game.description}</p>
        </div>

        {/* Comments */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold">玩家评价</h2>
            <Link to={`/games/${id}/comments`} className="text-sm text-indigo-600">
              查看全部
            </Link>
          </div>

          <div className="space-y-4">
            {game.comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{comment.user}</h3>
                      <div className="flex items-center space-x-1 mt-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            className={`w-4 h-4 ${
                              index < comment.rating
                                ? 'text-yellow-500 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{comment.time}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}