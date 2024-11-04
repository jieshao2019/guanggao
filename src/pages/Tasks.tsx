import React from 'react';
import { ArrowLeft, Gift, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';

export default function Tasks() {
  const { tasks, isLoading, claimReward } = useTasks();

  const handleClaim = async (taskId: number) => {
    try {
      await claimReward.mutateAsync(taskId);
    } catch (error) {
      console.error('Claim reward error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <div className="flex items-center mb-6">
          <Link to="/" className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="ml-3 text-xl font-bold">每日任务</h1>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="text-sm opacity-90">任务进度</h3>
              <p className="text-2xl font-bold mt-1">
                {tasks?.filter(t => t.completed).length || 0}/{tasks?.length || 0}
              </p>
            </div>
            <Clock className="w-8 h-8 opacity-80" />
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all"
              style={{
                width: `${
                  ((tasks?.filter(t => t.completed).length || 0) /
                    (tasks?.length || 1)) *
                  100
                }%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="p-4 space-y-4">
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">加载中...</div>
        ) : (
          tasks?.map((task) => (
            <div
              key={task.id}
              className={`bg-white rounded-lg p-4 ${
                task.completed ? 'border-l-4 border-green-500' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {task.description}
                  </p>
                  <div className="mt-2">
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all"
                        style={{
                          width: `${(task.progress / task.requirement) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {task.progress}/{task.requirement}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-indigo-600 font-medium">
                    +{task.points}
                  </span>
                  <p className="text-xs text-gray-500">积分奖励</p>
                </div>
              </div>
              {task.completed && !task.claimed && (
                <button
                  onClick={() => handleClaim(task.id)}
                  disabled={claimReward.isLoading}
                  className="w-full mt-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
                >
                  <Gift className="w-5 h-5 inline-block mr-2" />
                  领取奖励
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}