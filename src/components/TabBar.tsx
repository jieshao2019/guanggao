import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Gamepad2, PlayCircle, User } from 'lucide-react';

export default function TabBar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        <Link
          to="/"
          className={`flex flex-col items-center space-y-1 px-3 py-2 ${
            isActive('/') ? 'text-indigo-600' : 'text-gray-600'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs">首页</span>
        </Link>

        <Link
          to="/games"
          className={`flex flex-col items-center space-y-1 px-3 py-2 ${
            isActive('/games') ? 'text-indigo-600' : 'text-gray-600'
          }`}
        >
          <Gamepad2 className="w-6 h-6" />
          <span className="text-xs">游戏</span>
        </Link>

        <Link
          to="/ads"
          className={`flex flex-col items-center space-y-1 px-3 py-2 ${
            isActive('/ads') ? 'text-indigo-600' : 'text-gray-600'
          }`}
        >
          <PlayCircle className="w-6 h-6" />
          <span className="text-xs">广告</span>
        </Link>

        <Link
          to="/profile"
          className={`flex flex-col items-center space-y-1 px-3 py-2 ${
            isActive('/profile') ? 'text-indigo-600' : 'text-gray-600'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs">我的</span>
        </Link>
      </div>
    </nav>
  );
}