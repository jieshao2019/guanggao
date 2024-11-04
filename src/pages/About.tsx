import React from 'react';
import { ArrowLeft, Globe, Shield, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white">
        <div className="px-4 py-3 flex items-center">
          <Link to="/" className="text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="ml-4 text-xl font-bold">关于我们</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Company Info */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">平台介绍</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            我们是一个创新的广告收益平台，致力于为用户提供优质的广告观看体验和丰富的游戏娱乐内容。通过观看广告获取积分，享受游戏乐趣，同时建立良好的社交关系。
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <Globe className="w-8 h-8 text-indigo-600 mb-2" />
              <h3 className="font-medium mb-1">全球用户</h3>
              <p className="text-sm text-gray-500">来自世界各地的用户共同参与</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <Shield className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-medium mb-1">安全保障</h3>
              <p className="text-sm text-gray-500">严格的安全措施保护用户权益</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <Users className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-medium mb-1">社交互动</h3>
              <p className="text-sm text-gray-500">丰富的社交功能增进用户交流</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <Award className="w-8 h-8 text-purple-600 mb-2" />
              <h3 className="font-medium mb-1">收益保证</h3>
              <p className="text-sm text-gray-500">透明的收益机制确保用户利益</p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">联系我们</h2>
          <div className="space-y-3">
            <p className="flex items-center text-gray-600">
              <span className="font-medium w-20">客服邮箱：</span>
              <a href="mailto:support@example.com" className="text-indigo-600">
                support@example.com
              </a>
            </p>
            <p className="flex items-center text-gray-600">
              <span className="font-medium w-20">工作时间：</span>
              <span>周一至周日 9:00-21:00</span>
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="mt-8 space-y-4">
          <Link
            to="/terms"
            className="block bg-white p-4 rounded-lg text-gray-600 hover:bg-gray-50"
          >
            服务条款
          </Link>
          <Link
            to="/privacy"
            className="block bg-white p-4 rounded-lg text-gray-600 hover:bg-gray-50"
          >
            隐私政策
          </Link>
          <Link
            to="/help"
            className="block bg-white p-4 rounded-lg text-gray-600 hover:bg-gray-50"
          >
            帮助中心
          </Link>
        </div>
      </div>
    </div>
  );
}