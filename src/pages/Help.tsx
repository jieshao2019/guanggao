import React from 'react';
import { ArrowLeft, ChevronRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Help() {
  const faqCategories = [
    {
      title: '账号相关',
      questions: [
        '如何注册新账号？',
        '忘记密码怎么办？',
        '如何修改个人信息？'
      ]
    },
    {
      title: '广告观看',
      questions: [
        '每日可以观看多少个广告？',
        '为什么无法观看广告？',
        '如何获得更多观看次数？'
      ]
    },
    {
      title: '积分与提现',
      questions: [
        '如何赚取积分？',
        '积分如何兑换现金？',
        '提现需要多久到账？'
      ]
    },
    {
      title: 'VIP特权',
      questions: [
        'VIP有哪些特权？',
        '如何开通VIP？',
        'VIP等级如何提升？'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white">
        <div className="px-4 py-3 flex items-center">
          <Link to="/" className="text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="ml-4 text-xl font-bold">帮助中心</h1>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="搜索问题"
            className="w-full pl-10 pr-4 py-2 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="p-4 space-y-4">
        {faqCategories.map((category) => (
          <div key={category.title} className="bg-white rounded-lg overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="font-bold">{category.title}</h2>
            </div>
            <div className="divide-y">
              {category.questions.map((question, index) => (
                <Link
                  key={index}
                  to={`/help/detail/${index}`}
                  className="p-4 flex items-center justify-between hover:bg-gray-50"
                >
                  <span className="text-gray-600">{question}</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
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
            没有找到答案？联系客服获取帮助
          </p>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium">
            联系客服
          </button>
        </div>
      </div>
    </div>
  );
}