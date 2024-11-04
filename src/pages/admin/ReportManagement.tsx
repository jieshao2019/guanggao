import React from 'react';
import { Search, Filter, Flag } from 'lucide-react';

export default function ReportManagement() {
  const reports = [
    {
      id: 1,
      reporterId: 'user123',
      reportedId: 'user456',
      type: 'spam',
      content: '发送垃圾信息',
      status: 'pending',
      createdAt: '2024-03-10',
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">举报管理</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索举报..."
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
                举报ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                举报人
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                被举报人
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                类型
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                内容
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
            {reports.map((report) => (
              <tr key={report.id}>
                <td className="px-6 py-4 whitespace-nowrap">{report.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{report.reporterId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{report.reportedId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{report.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{report.content}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    report.status === 'resolved'
                      ? 'bg-green-100 text-green-800'
                      : report.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {report.status === 'resolved' ? '已处理' :
                     report.status === 'pending' ? '待处理' : '已驳回'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{report.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button className="text-green-600 hover:text-green-900">
                    处理
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    驳回
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