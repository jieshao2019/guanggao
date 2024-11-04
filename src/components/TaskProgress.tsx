import React from 'react';
import { Gift } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';

export default function TaskProgress() {
  const { tasks } = useTasks();

  if (!tasks?.length) return null;

  const completedTasks = tasks.filter(t => t.completed).length;
  const progress = (completedTasks / tasks.length) * 100;

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h2 className="font-medium">每日任务</h2>
          <p className="text-sm text-gray-500">
            完成 {completedTasks}/{tasks.length} 个任务
          </p>
        </div>
        <Gift className="w-6 h-6 text-indigo-600" />
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}