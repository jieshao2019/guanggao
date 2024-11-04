import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

interface GameProgress {
  level: number;
  experience: number;
  stats: {
    totalPlays: number;
    totalScore: number;
    highScore: number;
    playTime: number;
  };
  buffs: {
    id: number;
    multiplier: number;
    expiresAt: string;
  }[];
}

export function useGameProgress(gameId: number) {
  const queryClient = useQueryClient();

  const { data: progress, isLoading } = useQuery<GameProgress>(
    ['gameProgress', gameId],
    async () => {
      const { data } = await axios.get(`/api/games/${gameId}/progress`);
      return data;
    }
  );

  const updateProgress = useMutation<void, unknown, { experience: number; playTime: number }>(
    async ({ experience, playTime }) => {
      await axios.put(`/api/games/${gameId}/progress`, { experience, playTime });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['gameProgress', gameId]);
      },
    }
  );

  return {
    progress,
    isLoading,
    updateProgress,
  };
}