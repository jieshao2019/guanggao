import { useQuery } from 'react-query';
import axios from 'axios';

interface LeaderboardEntry {
  rank: number;
  userId: number;
  username: string;
  vipLevel: number;
  highScore: number;
  gamesPlayed: number;
}

interface LeaderboardResponse {
  leaderboard: LeaderboardEntry[];
  userRank: {
    rank: number | null;
    highScore: number;
  };
}

export function useLeaderboard(
  gameId: number,
  period: 'daily' | 'weekly' | 'monthly' | 'all' = 'all'
) {
  const { data, isLoading } = useQuery<LeaderboardResponse>(
    ['leaderboard', gameId, period],
    async () => {
      const { data } = await axios.get(
        `/api/leaderboard/games/${gameId}?period=${period}`
      );
      return data;
    }
  );

  return {
    entries: data?.leaderboard || [],
    userRank: data?.userRank,
    isLoading,
  };
}

export function useGlobalLeaderboard(
  period: 'daily' | 'weekly' | 'monthly' | 'all' = 'all'
) {
  const { data, isLoading } = useQuery(
    ['globalLeaderboard', period],
    async () => {
      const { data } = await axios.get(`/api/leaderboard/global?period=${period}`);
      return data;
    }
  );

  return {
    rankings: data || [],
    isLoading,
  };
}

export function useUserRankings(userId: number) {
  const { data, isLoading } = useQuery(
    ['userRankings', userId],
    async () => {
      const { data } = await axios.get(`/api/leaderboard/users/${userId}`);
      return data;
    }
  );

  return {
    rankings: data || [],
    isLoading,
  };
}