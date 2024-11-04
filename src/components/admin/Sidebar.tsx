import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Gamepad2,
  PlayCircle,
  DollarSign,
  Flag,
  Settings,
  LogOut
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  
  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: '控制台' },
    { path: '/admin/users', icon: Users, label: '用户管理' },
    { path: '/admin/games', icon: Gamepad2, label: '游戏管理' },
    { path: '/admin/ads', icon: PlayCircle, label: '广告管理' },
    { path: '/admin/transactions', icon: DollarSign, label: '交易管理' },
    { path: '/admin/reports', icon: Flag, label: '举报管理' },
    { path: '/admin/settings', icon: Settings, label: '系统设置' },
  ];

  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 border-r">
      <div className="p-6">
        <h1 className="text-xl font-bold">管理后台</h1>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 ${
              location.pathname === item.path ? 'bg-gray-50 text-indigo-600' : ''
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <button className="flex items-center text-gray-600 hover:text-red-600">
          <LogOut className="w-5 h-5 mr-3" />
          退出登录
        </button>
      </div>
    </div>
  );
}