import React from 'react';
import { ArrowLeft, Bell, MessageCircle, Gift, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotificationSettings() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white">
        <div className="px-4 py-3 flex items-center">
          <Link to="/settings" className="text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="ml-4 text-xl font-bold">通知设置</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Push Notifications */}
        <div className="bg-white rounded-lg">
          <div className="p-4 border-b">
            <h2 className="font-medium text-gray-600">推送通知</h2>
          </div>
          <div className="divide-y">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-400" />
                <span>系统通知</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-gray-400" />
                <span>消息通知</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <Gift className="w-5 h-5 text-gray-400" />
                <span>奖励通知</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-gray-400" />
                <span>活动通知</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Notification Time */}
        <div className="bg-white rounded-lg">
          <div className="p-4 border-b">
            <h2 className="font-medium text-gray-600">免打扰时间</h2>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <span>开启免打扰</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">时间段</span>
              <div className="text-gray-600">
                23:00 - 07:00
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}