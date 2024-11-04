import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessageCircle, Trophy, Star, Clock, UserPlus, UserMinus } from 'lucide-react';

export default function FriendProfile() {
  const { id } = useParams();
  const [isFriend, setIsFriend] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-white rounded-full"></div>
          <div className="text-white flex-1">
            <h1 className="text-xl font-bold">用户名</h1>
            <p className="text-sm opacity-90">ID: {id}</p>
          </div>
        </div>
        <div className="mt-6 flex space-x-2">
          <button className="flex-1 bg-white text-indigo-600 py-2 rounded-full font-medium">
            <MessageCircle className="w-5 h-5 inline-block mr-1" />
            发消息
          </button>
          <button 
            onClick={() => setIsFriend(!isFriend)}
            className={`flex-1 py-2 rounded-full font-medium ${
              isFriend 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-indigo-600'
            }`}
          >
            {isFriend ? (
              <>
                <UserMinus className="w-5 h-5 inline-block mr-1" />
                取消关注
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5 inline-block mr-1" />
                加为好友
              </>
            )}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 p-4">
        <div className="bg-white p-3 rounded-lg text-center">
          <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
          <p className="text-xl font-bold">1200</p>
          <p className="text-xs text-gray-600">总积分</p>
        </div>
        <div className="bg-white p-3 rounded-lg text-center">
          <Star className="w-6 h-6 text-blue-500 mx-auto mb-1" />
          <p className="text-xl font-bold">15</p>
          <p className="text-xs text-gray-600">游戏数</p>
        </div>
        <div className="bg-white p-3 rounded-lg text-center">
          <Clock className="w-6 h-6 text-green-500 mx-auto mb-1" />
          <p className="text-xl font-bold">32h</p>
          <p className="text-xs text-gray-600">游戏时长</p>
        </div>
      </div>

      {/* Recent Games */}
      <div className="p-4">
        <h2 className="font-bold text-lg mb-3">最近游戏</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((game) => (
            <div key={game} className="bg-white rounded-lg p-4 flex items-center space-x-3">
              <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
              <div className="flex-1">
                <h3 className="font-medium">游戏名称 {game}</h3>
                <p className="text-sm text-gray-500">最高分: {1000 * game}</p>
                <p className="text-xs text-gray-400">2小时前在玩</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}