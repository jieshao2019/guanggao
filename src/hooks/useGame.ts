import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

interface Game {
  id: number;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  pointsPerPlay: number;
  status: string;
}

interface GameScore {
  score: number;
  points: number;
  achievements: {
    id: number;
    title: string;
    points: number;
  }[];
}

export function useGame(gameId?: number) {
  const queryClient = useQueryClient();

  const { data: games } = useQuery<Game[]>(
    'games',
    async () => {
      const { data } = await axios.get('/api/games');
      return data;
    }
  );

  const { data: game } = useQuery<Game>(
    ['game', gameId],
    async () => {
      const { data } = await axios.get(`/api/games/${gameId}`);
      return data;
    },
    {
      enabled: !!gameId,
    }
  );

  const submitScore = useMutation<GameScore, unknown, { gameId: number; score: number }>(
    async ({ gameId, score }) => {
      const { data } = await axios.post(`/api/games/${gameId}/scores`, { score });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('games');
        queryClient.invalidateQueries(['game', gameId]);
        queryClient.invalidateQueries('user');
      },
    }
  );

  return {
    games,
    game,
    submitScore,
  };
}