import React from 'react';
import { ArrowLeft, Key, Smartphone, Shield, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SecuritySettings() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white">
        <div className="px-4 py-3 flex items-center">
          <Link to="/settings" className="text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="ml-4 text-xl font-bold">账号安全</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Password */}
        <div className="bg-white rounded-lg">
          <Link to="/settings/security/password" className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <Key className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium">修改密码</p>
                <p className="text-sm text-gray-500">建议定期更换密码</p>
              </div>
            </div>
            <ArrowLeft className="w-5 h-5 text-gray-400 transform rotate-180" />
          </Link>
        </div>

        {/* Phone */}
        <div className="bg-white rounded-lg">
          <Link to="/settings/security/phone" className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium">手机绑定</p>
                <p className="text-sm text-gray-500">已绑定：138****8888</p>
              </div>
            </div>
            <ArrowLeft className="w-5 h-5 text-gray-400 transform rotate-180" />
          </Link>
        </div>

        {/* Email */}
        <div className="bg-white rounded-lg">
          <Link to="/settings/security/email" className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium">邮箱绑定</p>
                <p className="text-sm text-gray-500">已绑定：exa****@example.com</p>
              </div>
            </div>
            <ArrowLeft className="w-5 h-5 text-gray-400 transform rotate-180" />
          </Link>
        </div>

        {/* Two-Factor Auth */}
        <div className="bg-white rounded-lg">
          <Link to="/settings/security/2fa" className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium">两步验证</p>
                <p className="text-sm text-gray-500">未开启</p>
              </div>
            </div>
            <ArrowLeft className="w-5 h-5 text-gray-400 transform rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}