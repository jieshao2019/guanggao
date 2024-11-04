import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, DollarSign, PlayCircle, BarChart2 } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { title: '总用户数', value: '1,234', icon: Users, change: '+12%' },
    { title: '今日收入', value: '$1,234', icon: DollarSign, change: '+8%' },
    { title: '广告观看', value: '5,678', icon: PlayCircle, change: '+15%' },
    { title: '活跃用户', value: '890', icon: BarChart2, change: '+5%' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">控制台</h1>
      
      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <stat.icon className="w-6 h-6 text-indigo-600" />
            </div>
            <p className={`text-sm mt-2 ${
              stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change} vs 上月
            </p>
          </div>
        ))}
      </div>

      {/* 其他统计图表和数据 */}
    </div>
  );
}