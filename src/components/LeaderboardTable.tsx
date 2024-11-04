import React from 'react';
import { Trophy, Medal, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LeaderboardEntry {
  rank: number;
  userId: number;
  username: string;
  vipLevel: number;
  highScore: number;
  gamesPlayed: number;
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  userRank?: { rank: number; highScore: number } | null;
}

export default function LeaderboardTable({ entries, userRank }: LeaderboardTableProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-yellow-800" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="font-bold">排行榜</h2>
      </div>

      <div className="divide-y">
        {entries.map((entry) => (
          <Link
            key={entry.userId}
            to={`/profile/${entry.userId}`}
            className="flex items-center p-4 hover:bg-gray-50"
          >
            <div className="w-8 flex justify-center">
              {getRankIcon(entry.rank) || (
                <span className="text-gray-500">{entry.rank}</span>
              )}
            </div>
            
            <div className="flex-1 ml-4">
              <div className="flex items-center">
                <span className="font-medium">{entry.username}</span>
                {entry.vipLevel > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                    VIP {entry.vipLevel}
                  </span>
                )}
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Trophy className="w-4 h-4 mr-1" />
                <span>{entry.highScore}分</span>
                <span className="mx-2">·</span>
                <span>{entry.gamesPlayed}场</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {userRank && (
        <div className="p-4 bg-gray-50 border-t">
          <div className="flex items-center">
            <div className="w-8 flex justify-center">
              <span className="text-gray-500">{userRank.rank || '-'}</span>
            </div>
            <div className="flex-1 ml-4">
              <span className="font-medium">我的排名</span>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Trophy className="w-4 h-4 mr-1" />
                <span>{userRank.highScore}分</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}