import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLeaderboard } from '../hooks/useLeaderboard';
import LeaderboardTable from '../components/LeaderboardTable';
import LeaderboardTabs from '../components/LeaderboardTabs';

export default function GameLeaderboard() {
  const { id } = useParams<{ id: string }>();
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'all'>('daily');
  const { entries, userRank, isLoading } = useLeaderboard(Number(id), period);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <h1 className="text-xl font-bold mb-4">排行榜</h1>
        <LeaderboardTabs period={period} onChange={setPeriod} />
      </div>

      {/* Leaderboard */}
      <div className="p-4">
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">加载中...</div>
        ) : (
          <LeaderboardTable entries={entries} userRank={userRank} />
        )}
      </div>
    </div>
  );
}