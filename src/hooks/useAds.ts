import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

interface AdView {
  id: number;
  points: number;
  duration: number;
  completedAt: string;
}

export function useAds() {
  const queryClient = useQueryClient();

  const { data: adViews, isLoading } = useQuery<AdView[]>(
    'adViews',
    async () => {
      const { data } = await axios.get('/api/ads/views');
      return data;
    }
  );

  const completeAd = useMutation(
    async ({ duration }: { duration: number }) => {
      const { data } = await axios.post('/api/ads/complete', { duration });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('adViews');
        queryClient.invalidateQueries('user');
      },
    }
  );

  return {
    adViews,
    isLoading,
    completeAd,
  };
}