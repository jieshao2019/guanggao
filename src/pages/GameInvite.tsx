import React from 'react';
import { ArrowLeft, Share2, Users, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GameInvite() {
  const inviteCode = 'ABC123';
  const rewards = [
    { level: 1, count: 1, points: 100 },
    { level: 2, count: 5, points: 500 },
    { level: 3, count: 10, points: 1000 },
  ];

  const invitedFriends = [
    { id: 1, username: '好友1', date: '2024-03-10', reward: 100 },
    { id: 2, username: '好友2', date: '2024-03-09', reward: 100 },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <div className="flex items-center mb-6">
          <Link to="/profile" className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="ml-3 text-xl font-bold">邀请好友</h1>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="font-medium">邀请码</h2>
              <p className="text-2xl font-bold mt-1">{inviteCode}</p>
            </div>
            <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium flex items-center">
              <Share2 className="w-5 h-5 mr-2" />
              分享
            </button>
          </div>
          <p className="text-sm opacity-80">
            邀请好友注册并完成任务，双方都可获得奖励
          </p>
        </div>
      </div>

      {/* Rewards */}
      <div className="p-4">
        <div className="bg-white rounded-lg p-4">
          <h2 className="font-bold mb-4">奖励规则</h2>
          <div className="space-y-4">
            {rewards.map((reward) => (
              <div
                key={reward.level}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Gift className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium">邀请{reward.count}名好友</p>
                    <p className="text-sm text-gray-500">
                      Level {reward.level} 奖励
                    </p>
                  </div>
                </div>
                <span className="text-indigo-600 font-medium">
                  +{reward.points}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Invited Friends */}
      <div className="p-4">
        <div className="bg-white rounded-lg">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-bold">已邀请好友</h2>
            <div className="flex items-center text-sm text-gray-500">
              <Users className="w-4 h-4 mr-1" />
              {invitedFriends.length}人
            </div>
          </div>
          <div className="divide-y">
            {invitedFriends.map((friend) => (
              <div key={friend.id} className="p-4 flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="ml-3 flex-1">
                  <p className="font-medium">{friend.username}</p>
                  <p className="text-sm text-gray-500">{friend.date}</p>
                </div>
                <span className="text-indigo-600">+{friend.reward}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}