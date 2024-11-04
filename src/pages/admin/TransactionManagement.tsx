import React from 'react';
import { Search, Filter, DollarSign } from 'lucide-react';

export default function TransactionManagement() {
  const transactions = [
    {
      id: 1,
      userId: 'user123',
      type: 'withdraw',
      amount: 100,
      method: 'PayPal',
      status: 'pending',
      createdAt: '2024-03-10',
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">交易管理</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索交易..."
              className="pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-gray-100 rounded-lg">
            <Filter className="w-5 h-5 mr-2" />
            筛选
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                交易ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                用户ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                类型
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                金额
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                方式
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                状态
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                时间
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.userId}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {transaction.type === 'withdraw' ? '提现' : '充值'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">${transaction.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.method}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    transaction.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : transaction.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.status === 'completed' ? '已完成' :
                     transaction.status === 'pending' ? '待处理' : '已拒绝'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button className="text-green-600 hover:text-green-900">
                    通过
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    拒绝
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}