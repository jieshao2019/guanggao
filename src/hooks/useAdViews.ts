import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

interface AdView {
  id: number;
  points: number;
  duration: number;
  completedAt: string;
}

export function useAdViews() {
  const queryClient = useQueryClient();

  const { data: views, isLoading } = useQuery<AdView[]>(
    'adViews',
    async () => {
      const { data } = await axios.get('/api/ads/views');
      return data;
    }
  );

  const completeView = useMutation<{ points: number }>(
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
    views,
    isLoading,
    completeView,
  };
}