import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

interface GameItem {
  id: number;
  name: string;
  description: string;
  type: string;
  price: number;
  duration?: number;
  quantity?: number;
  expiresAt?: string;
}

export function useGameItems(gameId: number) {
  const queryClient = useQueryClient();

  const { data: items } = useQuery<GameItem[]>(
    ['gameItems', gameId],
    async () => {
      const { data } = await axios.get(`/api/games/${gameId}/items`);
      return data;
    }
  );

  const purchaseItem = useMutation<void, unknown, { itemId: number; quantity: number }>(
    async ({ itemId, quantity }) => {
      await axios.post(`/api/games/${gameId}/items/${itemId}`, { quantity });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['gameItems', gameId]);
        queryClient.invalidateQueries('user');
      },
    }
  );

  return {
    items,
    purchaseItem,
  };
}