import create from 'zustand';
import { useGameApi } from '../hooks/useApi';

interface Game {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  pointsPerPlay: number;
}

interface GameStore {
  games: Game[];
  currentGame: Game | null;
  loading: boolean;
  error: string | null;
  fetchGames: () => Promise<void>;
  setCurrentGame: (game: Game | null) => void;
  submitScore: (gameId: number, score: number) => Promise<void>;
}

export const useGameStore = create<GameStore>((set, get) => {
  const gameApi = useGameApi();

  return {
    games: [],
    currentGame: null,
    loading: false,
    error: null,

    fetchGames: async () => {
      try {
        set({ loading: true, error: null });
        const games = await gameApi.getGames();
        set({ games, loading: false });
      } catch (error) {
        set({ error: 'Failed to fetch games', loading: false });
      }
    },

    setCurrentGame: (game) => {
      set({ currentGame: game });
    },

    submitScore: async (gameId, score) => {
      try {
        set({ loading: true, error: null });
        await gameApi.submitScore(gameId, score);
        set({ loading: false });
      } catch (error) {
        set({ error: 'Failed to submit score', loading: false });
      }
    },
  };
});