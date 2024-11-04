import React, { useState } from 'react';
import { ArrowLeft, Search, MessageCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GameChat() {
  const [activeTab, setActiveTab] = useState<'chat' | 'online'>('chat');
  const [searchQuery, setSearchQuery] = useState('');

  const chats = [
    {
      id: 1,
      name: '游戏大厅',
      lastMessage: '有人一起玩吗？',
      time: '刚刚',
      unread: 2,
      online: 128,
      type: 'room',
    },
    {
      id: 2,
      name: '玩家1',
      lastMessage: '好的，我们开始吧',
      time: '5分钟前',
      unread: 0,
      status: 'online',
      type: 'private',
    },
  ];

  const onlinePlayers = [
    {
      id: 1,
      name: '玩家1',
      status: 'playing',
      game: '益智消除',
    },
    {
      id: 2,
      name: '玩家2',
      status: 'online',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/games" className="text-gray-600">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="ml-4 text-xl font-bold">游戏聊天</h1>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('chat')}
              className={`p-2 rounded-lg ${
                activeTab === 'chat'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <MessageCircle className="w-6 h-6" />
            </button>
            <button
              onClick={() => setActiveTab('online')}
              className={`p-2 rounded-lg ${
                activeTab === 'online'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Users className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={activeTab === 'chat' ? "搜索聊天" : "搜索在线玩家"}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'chat' ? (
        <div className="divide-y divide-gray-200">
          {chats.map((chat) => (
            <Link
              key={chat.id}
              to={`/chat/${chat.id}`}
              className="bg-white p-4 flex items-center space-x-3"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                {chat.type === 'room' && (
                  <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs px-1.5 rounded-full">
                    {chat.online}
                  </div>
                )}
                {chat.type === 'private' && chat.status === 'online' && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <h3 className="font-medium">{chat.name}</h3>
                  <span className="text-xs text-gray-500">{chat.time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <div className="w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  {chat.unread}
                </div>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {onlinePlayers.map((player) => (
            <div key={player.id} className="bg-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                    player.status === 'playing' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                </div>
                <div>
                  <h3 className="font-medium">{player.name}</h3>
                  <p className="text-sm text-gray-500">
                    {player.status === 'playing' 
                      ? `正在玩 ${player.game}`
                      : '在线'
                    }
                  </p>
                </div>
              </div>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm">
                邀请
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}