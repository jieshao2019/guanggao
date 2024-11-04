import React from 'react';
import { ArrowLeft, User, Lock, Bell, Globe, Shield, Moon, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UserSettings() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white">
        <div className="px-4 py-3 flex items-center">
          <Link to="/profile" className="text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="ml-4 text-xl font-bold">账号设置</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Account Settings */}
        <div className="bg-white rounded-lg">
          <div className="p-4 border-b">
            <h2 className="font-medium text-gray-600">账号</h2>
          </div>
          <div className="divide-y">
            <Link to="/settings/profile" className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <span>个人资料</span>
              </div>
              <ArrowLeft className="w-5 h-5 text-gray-400 transform rotate-180" />
            </Link>
            <Link to="/settings/security" className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-gray-400" />
                <span>账号安全</span>
              </div>
              <ArrowLeft className="w-5 h-5 text-gray-400 transform rotate-180" />
            </Link>
            <Link to="/settings/privacy" className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-400" />
                <span>隐私设置</span>
              </div>
              <ArrowLeft className="w-5 h-5 text-gray-400 transform rotate-180" />
            </Link>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg">
          <div className="p-4 border-b">
            <h2 className="font-medium text-gray-600">通知</h2>
          </div>
          <div className="divide-y">
            <Link to="/settings/notifications" className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-400" />
                <span>通知设置</span>
              </div>
              <ArrowLeft className="w-5 h-5 text-gray-400 transform rotate-180" />
            </Link>
          </div>
        </div>

        {/* General Settings */}
        <div className="bg-white rounded-lg">
          <div className="p-4 border-b">
            <h2 className="font-medium text-gray-600">通用</h2>
          </div>
          <div className="divide-y">
            <Link to="/settings/language" className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-gray-400" />
                <span>语言</span>
              </div>
              <div className="flex items-center text-gray-400">
                <span className="mr-2">简体中文</span>
                <ArrowLeft className="w-5 h-5 transform rotate-180" />
              </div>
            </Link>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <Moon className="w-5 h-5 text-gray-400" />
                <span>深色模式</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            <Link to="/settings/devices" className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-gray-400" />
                <span>设备管理</span>
              </div>
              <ArrowLeft className="w-5 h-5 text-gray-400 transform rotate-180" />
            </Link>
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-lg">
          <div className="divide-y">
            <Link to="/about" className="flex items-center justify-between p-4">
              <span>关于我们</span>
              <ArrowLeft className="w-5 h-5 text-gray-400 transform rotate-180" />
            </Link>
            <Link to="/privacy" className="flex items-center justify-between p-4">
              <span>隐私政策</span>
              <ArrowLeft className="w-5 h-5 text-gray-400 transform rotate-180" />
            </Link>
            <Link to="/terms" className="flex items-center justify-between p-4">
              <span>服务条款</span>
              <ArrowLeft className="w-5 h-5 text-gray-400 transform rotate-180" />
            </Link>
          </div>
        </div>

        <button className="w-full bg-red-500 text-white py-3 rounded-lg">
          退出登录
        </button>
      </div>
    </div>
  );
}