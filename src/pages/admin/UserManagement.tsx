import React from 'react';
import { Search, Filter } from 'lucide-react';

export default function UserManagement() {
  const users = [
    {
      id: 1,
      username: '用户1',
      email: 'user1@example.com',
      vipLevel: 2,
      points: 1200,
      status: 'active',
      createdAt: '2024-03-10',
    },
    // ... more users
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">用户管理</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索用户..."
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
                用户名
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                邮箱
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                VIP等级
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                积分
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                状态
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                注册时间
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">VIP {user.vipLevel}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.points}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status === 'active' ? '正常' : '禁用'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{user.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    编辑
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