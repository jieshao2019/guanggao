import React from 'react';
import { Calendar, Clock, Award } from 'lucide-react';

export default function AdHistory() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg">
          <h3 className="text-sm text-gray-600">本月总收益</h3>
          <p className="text-xl font-bold mt-1">1280积分</p>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <h3 className="text-sm text-gray-600">已观看广告</h3>
          <p className="text-xl font-bold mt-1">42次</p>
        </div>
      </div>

      {/* History List */}
      <div className="bg-white rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-bold">观看记录</h2>
        </div>
        
        <div className="divide-y">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">广告标题 {item}</h3>
                  <div className="flex items-center space-x-3 mt-1 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      2024-03-{10-item}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      30秒
                    </span>
                    <span className="flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      +30积分
                    </span>
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {14 + item}:30
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}