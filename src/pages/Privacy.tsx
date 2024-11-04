import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white">
        <div className="px-4 py-3 flex items-center">
          <Link to="/" className="text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="ml-4 text-xl font-bold">隐私政策</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-white rounded-lg p-6 space-y-6">
          {/* Introduction */}
          <div>
            <h2 className="text-lg font-bold mb-2">隐私保护声明</h2>
            <p className="text-gray-600 leading-relaxed">
              我们非常重视用户的隐私保护，承诺采取一切合理可行的措施，保护用户的个人信息安全。本隐私政策详细说明了我们如何收集、使用、存储和保护您的个人信息。
            </p>
          </div>

          {/* Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <Shield className="w-8 h-8 text-indigo-600 mb-2" />
              <h3 className="font-medium mb-1">数据安全</h3>
              <p className="text-sm text-gray-500">
                采用业界领先的安全技术保护您的个人信息
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <Lock className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-medium mb-1">隐私保护</h3>
              <p className="text-sm text-gray-500">
                严格的访问控制确保信息不被滥用
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <Eye className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-medium mb-1">透明公开</h3>
              <p className="text-sm text-gray-500">
                清晰说明数据收集和使用方式
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <UserCheck className="w-8 h-8 text-purple-600 mb-2" />
              <h3 className="font-medium mb-1">用户控制</h3>
              <p className="text-sm text-gray-500">
                您可以随时管理自己的隐私设置
              </p>
            </div>
          </div>

          {/* Detailed Sections */}
          <div className="space-y-4">
            <section>
              <h3 className="font-bold mb-2">信息收集</h3>
              <p className="text-gray-600">
                我们收集的信息包括但不限于：
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>账号信息（用户名、邮箱等）</li>
                <li>设备信息</li>
                <li>使用记录</li>
                <li>交易信息</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold mb-2">信息使用</h3>
              <p className="text-gray-600">
                我们使用收集的信息用于：
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>提供和改进服务</li>
                <li>个性化用户体验</li>
                <li>安全防护</li>
                <li>数据分析</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold mb-2">信息保护</h3>
              <p className="text-gray-600">
                我们采取多重措施保护您的信息：
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>数据加密存储</li>
                <li>访问权限控制</li>
                <li>安全审计</li>
                <li>定期安全评估</li>
              </ul>
            </section>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">联系我们</h3>
            <p className="text-gray-600">
              如果您对我们的隐私政策有任何疑问，请联系：
              <a href="mailto:privacy@example.com" className="text-indigo-600 ml-1">
                privacy@example.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}