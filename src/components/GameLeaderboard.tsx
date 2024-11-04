import React from 'react';
import { Trophy, Medal } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  avatar?: string;
}

interface GameLeaderboardProps {
  entries: LeaderboardEntry[];
}

export default function GameLeaderboard({ entries }: GameLeaderboardProps) {
  const topThree = entries.slice(0, 3);
  const rest = entries.slice(3);

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      {/* Top 3 */}
      <div className="p-4 flex justify-between items-end">
        {/* Second Place */}
        <div className="text-center flex-1">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2"></div>
          <Medal className="w-6 h-6 text-gray-400 mx-auto mb-1" />
          <p className="font-medium">{topThree[1]?.username}</p>
          <p className="text-sm text-gray-500">{topThree[1]?.score}分</p>
        </div>

        {/* First Place */}
        <div className="text-center flex-1">
          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-2"></div>
          <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-1" />
          <p className="font-bold">{topThree[0]?.username}</p>
          <p className="text-sm text-gray-500">{topThree[0]?.score}分</p>
        </div>

        {/* Third Place */}
        <div className="text-center flex-1">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2"></div>
          <Medal className="w-6 h-6 text-yellow-800 mx-auto mb-1" />
          <p className="font-medium">{topThree[2]?.username}</p>
          <p className="text-sm text-gray-500">{topThree[2]?.score}分</p>
        </div>
      </div>

      {/* Rest of Rankings */}
      <div className="divide-y">
        {rest.map((entry) => (
          <div key={entry.rank} className="p-4 flex items-center">
            <span className="w-8 text-center font-medium text-gray-500">
              {entry.rank}
            </span>
            <div className="w-10 h-10 bg-gray-200 rounded-full mx-4"></div>
            <div className="flex-1">
              <p className="font-medium">{entry.username}</p>
              <p className="text-sm text-gray-500">{entry.score}分</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}