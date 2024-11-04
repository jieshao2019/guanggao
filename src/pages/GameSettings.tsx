import React from 'react';
import { ArrowLeft, Volume2, Bell, Globe, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GameSettings() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white">
        <div className="px-4 py-3 flex items-center">
          <Link to="/games" className="text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="ml-4 text-xl font-bold">游戏设置</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Sound Settings */}
        <div className="bg-white rounded-lg">
          <div className="p-4 border-b">
            <h2 className="font-medium text-gray-600">声音设置</h2>
          </div>
          <div className="divide-y">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <Volume2 className="w-5 h-5 text-gray-400" />
                <span>游戏音效</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <Volume2 className="w-5 h-5 text-gray-400" />
                <span>背景音乐</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg">
          <div className="p-4 border-b">
            <h2 className="font-medium text-gray-600">通知设置</h2>
          </div>
          <div className="divide-y">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-400" />
                <span>游戏通知</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Language Settings */}
        <div className="bg-white rounded-lg">
          <div className="p-4 border-b">
            <h2 className="font-medium text-gray-600">语言设置</h2>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-gray-400" />
                <span>游戏语言</span>
              </div>
              <select className="text-sm text-gray-600 bg-transparent">
                <option>简体中文</option>
                <option>English</option>
              </select>
            </div>
          </div>
        </div>

        {/* Help & Support */}
        <div className="bg-white rounded-lg">
          <Link to="/help" className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <HelpCircle className="w-5 h-5 text-gray-400" />
              <span>帮助与支持</span>
            </div>
            <ArrowLeft className="w-5 h-5 text-gray-400 transform rotate-180" />
          </Link>
        </div>

        {/* Version Info */}
        <div className="bg-white rounded-lg p-4">
          <div className="text-center text-sm text-gray-500">
            <p>当前版本：1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}</content>