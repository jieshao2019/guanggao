import React from 'react';
import { Bell, MessageCircle, Gift, Settings } from 'lucide-react';
import { format } from 'date-fns';

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: 'message',
      title: '新消息提醒',
      content: '您收到一条新的好友消息',
      time: new Date(),
      read: false
    },
    {
      id: 2,
      type: 'reward',
      title: '奖励到账',
      content: '观看广告奖励30积分已到账',
      time: new Date(Date.now() - 3600000),
      read: true
    },
    {
      id: 3,
      type: 'system',
      title: '系统通知',
      content: '您的VIP特权即将到期',
      time: new Date(Date.now() - 7200000),
      read: true
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageCircle className="w-6 h-6 text-blue-500" />;
      case 'reward':
        return <Gift className="w-6 h-6 text-green-500" />;
      case 'system':
        return <Bell className="w-6 h-6 text-yellow-500" />;
      default:
        return <Bell className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      {/* Header */}
      <div className="bg-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">通知</h1>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Settings className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Notifications List */}
      <div className="p-4 space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-lg p-4 flex items-start space-x-3 ${
              !notification.read ? 'border-l-4 border-indigo-600' : ''
            }`}
          >
            <div className="p-2 bg-gray-100 rounded-full">
              {getIcon(notification.type)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{notification.title}</h3>
                <span className="text-xs text-gray-500">
                  {format(notification.time, 'HH:mm')}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {notification.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* No Notifications */}
      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8">
          <Bell className="w-16 h-16 text-gray-300 mb-4" />
          <p className="text-gray-500">暂无通知</p>
        </div>
      )}
    </div>
  );
}