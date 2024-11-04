import React, { useState } from 'react';
import { Trophy, Users, Star } from 'lucide-react';
import { useGlobalLeaderboard } from '../hooks/useLeaderboard';
import LeaderboardTabs from '../components/LeaderboardTabs';

export default function GlobalLeaderboard() {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'all'>('daily');
  const { rankings, isLoading } = useGlobalLeaderboard(period);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <h1 className="text-xl font-bold mb-4">全球排行</h1>
        <LeaderboardTabs period={period} onChange={setPeriod} />

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <Trophy className="w-6 h-6 mx-auto mb-1" />
            <p className="text-sm opacity-90">总分</p>
            <p className="text-xl font-bold">{rankings[0]?.totalScore || 0}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <Users className="w-6 h-6 mx-auto mb-1" />
            <p className="text-sm opacity-90">参与玩家</p>
            <p className="text-xl font-bold">{rankings.length}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <Star className="w-6 h-6 mx-auto mb-1" />
            <p className="text-sm opacity-90">游戏数</p>
            <p className="text-xl font-bold">
              {rankings[0]?.gamesPlayed || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Rankings */}
      <div className="p-4">
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">加载中...</div>
        ) : (
          <div className="bg-white rounded-lg">
            <div className="p-4 border-b">
              <h2 className="font-bold">排行榜</h2>
            </div>
            <div className="divide-y">
              {rankings.map((user) => (
                <Link
                  key={user.id}
                  to={`/profile/${user.id}`}
                  className="flex items-center p-4 hover:bg-gray-50"
                >
                  <div className="w-8 flex justify-center">
                    <span className="text-gray-500">{user.rank}</span>
                  </div>
                  <div className="flex-1 ml-4">
                    <div className="flex items-center">
                      <span className="font-medium">{user.username}</span>
                      {user.vipLevel > 0 && (
                        <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                          VIP {user.vipLevel}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Trophy className="w-4 h-4 mr-1" />
                      <span>{user.totalScore}分</span>
                      <span className="mx-2">·</span>
                      <span>{user.gamesPlayed}场</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}