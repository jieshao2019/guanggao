import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

interface ShopItem {
  id: number;
  name: string;
  description: string;
  type: string;
  price: number;
  duration?: number;
  imageUrl?: string;
  quantity?: number;
  expiresAt?: string;
}

export function useShop() {
  const queryClient = useQueryClient();

  const { data: items, isLoading } = useQuery<ShopItem[]>(
    'shopItems',
    async () => {
      const { data } = await axios.get('/api/shop/items');
      return data;
    }
  );

  const purchaseItem = useMutation<void, unknown, { itemId: number; quantity?: number }>(
    async ({ itemId, quantity }) => {
      await axios.post(`/api/shop/items/${itemId}`, { quantity });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('shopItems');
        queryClient.invalidateQueries('user');
      },
    }
  );

  const useItem = useMutation<void, unknown, number>(
    async (itemId) => {
      await axios.post(`/api/shop/items/${itemId}/use`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('shopItems');
      },
    }
  );

  return {
    items,
    isLoading,
    purchaseItem,
    useItem,
  };
}