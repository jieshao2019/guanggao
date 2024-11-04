import React, { useState } from 'react';
import { ArrowLeft, DollarSign, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Withdraw() {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle withdrawal request
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white">
        <div className="px-4 py-3 flex items-center">
          <Link to="/wallet" className="text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="ml-4 text-xl font-bold">提现</h1>
        </div>
      </div>

      {/* Balance Info */}
      <div className="p-4 bg-white mt-2">
        <div className="flex items-center justify-between">
          <p className="text-gray-600">可提现余额</p>
          <p className="text-xl font-bold">${user?.balance || '0.00'}</p>
        </div>
      </div>

      {/* Withdraw Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div className="bg-white rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            提现金额
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-10 w-full py-2 border-b focus:outline-none focus:border-indigo-600 text-xl"
              placeholder="0.00"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            最低提现金额：$10.00
          </p>
        </div>

        <div className="bg-white rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            提现方式
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full py-2 border-b focus:outline-none focus:border-indigo-600"
          >
            <option value="">选择提现方式</option>
            <option value="paypal">PayPal</option>
            <option value="bank">银行卡</option>
            <option value="alipay">支付宝</option>
          </select>
        </div>

        <div className="bg-white rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-600">
            <p className="font-medium mb-1">提现说明</p>
            <ul className="list-disc list-inside space-y-1 text-gray-500">
              <li>提现申请将在1-3个工作日内处理</li>
              <li>提现手续费率为2%</li>
              <li>请确保提供的收款信息准确无误</li>
            </ul>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium disabled:opacity-50"
          disabled={!amount || !paymentMethod}
        >
          确认提现
        </button>
      </form>
    </div>
  );
}