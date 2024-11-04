import React from 'react';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, History } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function Wallet() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      {/* Balance Card */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <div className="flex items-center space-x-3 mb-6">
          <WalletIcon className="w-8 h-8" />
          <h1 className="text-xl font-bold">我的钱包</h1>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <p className="text-sm opacity-90">总余额 (USD)</p>
          <p className="text-3xl font-bold mt-1">${user?.balance || '0.00'}</p>
          <div className="mt-4 flex space-x-2">
            <Link
              to="/withdraw"
              className="flex-1 bg-white text-indigo-600 py-2 rounded-lg text-center text-sm font-medium"
            >
              提现
            </Link>
            <button className="flex-1 bg-white/20 text-white py-2 rounded-lg text-sm font-medium">
              充值
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">可用积分</p>
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
            <p className="text-xl font-bold">{user?.points || 0}</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">今日收益</p>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <ArrowDownLeft className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-xl font-bold">$0.00</p>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="p-4">
        <div className="bg-white rounded-lg">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-bold">交易记录</h2>
            <Link to="/wallet/history" className="text-sm text-indigo-600">
              查看全部
            </Link>
          </div>
          
          <div className="divide-y">
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <History className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">观看广告奖励</p>
                    <p className="text-sm text-gray-500">2024-03-{10-item}</p>
                  </div>
                </div>
                <span className="text-green-600 font-medium">+$0.30</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}