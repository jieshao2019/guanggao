import React from 'react';
import { Search, Plus, Filter } from 'lucide-react';

export default function GameManagement() {
  const games = [
    {
      id: 1,
      title: '益智消除',
      category: '休闲',
      players: 1000,
      pointsPerPlay: 50,
      status: 'active',
      createdAt: '2024-03-10',
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">游戏管理</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索游戏..."
              className="pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg">
            <Plus className="w-5 h-5 mr-2" />
            添加游戏
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                游戏名称
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                分类
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                玩家数
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                积分奖励
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                状态
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                创建时间
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {games.map((game) => (
              <tr key={game.id}>
                <td className="px-6 py-4 whitespace-nowrap">{game.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{game.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{game.players}</td>
                <td className="px-6 py-4 whitespace-nowrap">+{game.pointsPerPlay}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    game.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {game.status === 'active' ? '上线' : '下线'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{game.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    编辑
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    下线
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