import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Gamepad2, PlaySquare, MessageCircle, User } from 'lucide-react';

export default function Navbar() {
  const navItems = [
    { to: '/', icon: Home, label: '首页' },
    { to: '/games', icon: Gamepad2, label: '游戏' },
    { to: '/ads', icon: PlaySquare, label: '广告' },
    { to: '/chat', icon: MessageCircle, label: '消息' },
    { to: '/profile', icon: User, label: '我的' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center space-y-1 px-3 py-1 ${
                isActive ? 'text-indigo-600' : 'text-gray-600'
              }`
            }
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}