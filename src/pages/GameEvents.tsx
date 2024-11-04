import React from 'react';
import { ArrowLeft, Calendar, Users, Gift, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GameEvents() {
  const events = [
    {
      id: 1,
      title: '周末双倍积分',
      description: '周末期间参与游戏可获得双倍积分奖励',
      startTime: '2024-03-16 00:00',
      endTime: '2024-03-17 23:59',
      participants: 128,
      rewards: '双倍积分',
      status: 'upcoming',
    },
    {
      id: 2,
      title: '新春挑战赛',
      description: '参与特定游戏挑战，赢取丰厚奖励',
      startTime: '2024-03-20 00:00',
      endTime: '2024-03-25 23:59',
      participants: 256,
      rewards: '限定头像框',
      status: 'ongoing',
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
        <div className="flex items-center mb-4">
          <Link to="/games" className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="ml-3 text-xl font-bold">活动中心</h1>
        </div>
      </div>

      {/* Events List */}
      <div className="p-4 space-y-4">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg overflow-hidden">
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg">{event.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {event.description}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  event.status === 'ongoing'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {event.status === 'ongoing' ? '进行中' : '即将开始'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <Calendar className="w-6 h-6 text-indigo-600 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">活动时间</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {event.startTime.split(' ')[0]}
                    <br />
                    {event.endTime.split(' ')[0]}
                  </p>
                </div>
                <div className="text-center">
                  <Users className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">参与人数</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {event.participants}人
                  </p>
                </div>
                <div className="text-center">
                  <Gift className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">活动奖励</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {event.rewards}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>
                    {event.status === 'ongoing' ? '剩余' : '开始倒计时'}：2天
                  </span>
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">
                  {event.status === 'ongoing' ? '立即参与' : '预约提醒'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}