import React, { useState } from 'react';
import { ArrowLeft, Search, MessageCircle, ThumbsUp, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GameCommunity() {
  const [activeTab, setActiveTab] = useState('hot');
  
  const posts = [
    {
      id: 1,
      title: '新手攻略分享',
      content: '分享一些游戏技巧和心得...',
      author: '玩家1',
      category: '攻略',
      views: 1200,
      likes: 45,
      comments: 23,
      time: '2小时前',
    },
    {
      id: 2,
      title: '寻找游戏队友',
      content: '想找几个固定队友一起玩...',
      author: '玩家2',
      category: '组队',
      views: 800,
      likes: 32,
      comments: 15,
      time: '3小时前',
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
            <h1 className="ml-4 text-xl font-bold">游戏社区</h1>
          </div>
          <Link 
            to="/community/post/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            发帖
          </Link>
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="搜索帖子"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 flex border-b">
          {[
            { id: 'hot', label: '热门' },
            { id: 'new', label: '最新' },
            { id: 'following', label: '关注' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === tab.id
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Posts List */}
      <div className="p-4 space-y-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/community/post/${post.id}`}
            className="block bg-white rounded-lg p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-lg">{post.title}</h3>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                  {post.content}
                </p>
                <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded">
                    {post.category}
                  </span>
                  <span>{post.time}</span>
                </div>
              </div>
              {post.imageUrl && (
                <div className="ml-4 w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
            <div className="flex items-center space-x-6 mt-3 text-sm text-gray-500">
              <span className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {post.views}
              </span>
              <span className="flex items-center">
                <ThumbsUp className="w-4 h-4 mr-1" />
                {post.likes}
              </span>
              <span className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-1" />
                {post.comments}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}