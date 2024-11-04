import React from 'react';
import { Bell, Globe, Shield, Moon, Volume2, HelpCircle } from 'lucide-react';

export default function Settings() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">设置</h1>
        </div>

        {/* Notification Settings */}
        <div className="p-4 border-b">
          <h2 className="text-sm font-medium text-gray-600 mb-3">通知设置</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-400" />
                <span>推送通知</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Volume2 className="w-5 h-5 text-gray-400" />
                <span>声音</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* General Settings */}
        <div className="p-4 border-b">
          <h2 className="text-sm font-medium text-gray-600 mb-3">通用设置</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-gray-400" />
                <span>语言</span>
              </div>
              <select className="text-sm text-gray-600 bg-transparent">
                <option>简体中文</option>
                <option>English</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Moon className="w-5 h-5 text-gray-400" />
                <span>深色模式</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="p-4 border-b">
          <h2 className="text-sm font-medium text-gray-600 mb-3">隐私设置</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-400" />
                <span>账号安全</span>
              </div>
              <button className="text-sm text-indigo-600">修改密码</button>
            </div>
          </div>
        </div>

        {/* Help & Support */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <HelpCircle className="w-5 h-5 text-gray-400" />
              <span>帮助与支持</span>
            </div>
            <button className="text-sm text-indigo-600">联系我们</button>
          </div>
        </div>
      </div>
    </div>
  );
}