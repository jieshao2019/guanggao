import React from 'react';
import { ArrowLeft, HelpCircle, Book, Star, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GameHelp() {
  const sections = [
    {
      title: '新手指南',
      icon: Book,
      items: [
        '如何开始游戏？',
        '基本操作说明',
        '游戏规则介绍',
        '积分获取方式'
      ]
    },
    {
      title: '常见问题',
      icon: HelpCircle,
      items: [
        '为什么无法获得积分？',
        '如何提升游戏等级？',
        '如何邀请好友？',
        '游戏卡顿怎么办？'
      ]
    },
    {
      title: '游戏技巧',
      icon: Star,
      items: [
        '新手入门技巧',
        '进阶玩法攻略',
        '高分技巧分享',
        '道具使用指南'
      ]
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
          <h1 className="ml-3 text-xl font-bold">帮助中心</h1>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="搜索问题..."
            className="w-full pl-4 pr-10 py-2 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <HelpCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Help Sections */}
      <div className="p-4 space-y-4">
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-lg">
            <div className="p-4 border-b flex items-center">
              <section.icon className="w-5 h-5 text-indigo-600 mr-2" />
              <h2 className="font-bold">{section.title}</h2>
            </div>
            <div className="divide-y">
              {section.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  to={`/help/detail/${index}-${itemIndex}`}
                  className="block p-4 hover:bg-gray-50"
                >
                  <p className="text-gray-600">{item}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="p-4">
        <div className="bg-white rounded-lg p-4 text-center">
          <p className="text-gray-600 mb-4">
            没有找到需要的帮助？联系客服获取支持
          </p>
          <button className="flex items-center justify-center space-x-2 bg-indigo-600 text-white px-6 py-2 rounded-lg mx-auto">
            <MessageCircle className="w-5 h-5" />
            <span>联系客服</span>
          </button>
        </div>
      </div>
    </div>
  );
}