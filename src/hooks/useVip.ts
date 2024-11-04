import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

interface VipPackage {
  id: number;
  name: string;
  level: number;
  price: number;
  duration: number;
  benefits: string[];
}

interface VipInfo {
  currentLevel: number;
  expireAt: string | null;
  levels: VipPackage[];
}

export function useVip() {
  const queryClient = useQueryClient();

  const { data: vipInfo, isLoading } = useQuery<VipInfo>(
    'vip',
    async () => {
      const { data } = await axios.get('/api/vip');
      return data;
    }
  );

  const purchase = useMutation<void, unknown, { level: number; months: number }>(
    async ({ level, months }) => {
      await axios.post('/api/vip/purchase', { level, months });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('vip');
        queryClient.invalidateQueries('user');
      },
    }
  );

  return {
    vipInfo,
    isLoading,
    purchase,
  };
}