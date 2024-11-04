import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

interface Achievement {
  id: number;
  typeId: number;
  typeName: string;
  title: string;
  description: string;
  requirement: number;
  points: number;
  icon?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress?: number;
  completed?: boolean;
  completedAt?: string;
  rewards: {
    type: string;
    value: string;
  }[];
}

interface Milestone {
  id: number;
  count: number;
  title: string;
  description: string;
  points: number;
  completed: boolean;
}

interface AchievementProgress {
  typeId: number;
  typeName: string;
  value: number;
}

export function useAchievements() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<{
    achievements: Achievement[];
    milestones: Milestone[];
  }>(
    'achievements',
    async () => {
      const { data } = await axios.get('/api/achievements');
      return data;
    }
  );

  const { data: progress } = useQuery<AchievementProgress[]>(
    'achievementProgress',
    async () => {
      const { data } = await axios.get('/api/achievements/progress');
      return data;
    }
  );

  const updateProgress = useMutation<
    void,
    unknown,
    { typeId: number; value: number }
  >(
    async ({ typeId, value }) => {
      await axios.post(`/api/achievements/progress/${typeId}`, { value });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('achievements');
        queryClient.invalidateQueries('achievementProgress');
        queryClient.invalidateQueries('user');
      },
    }
  );

  return {
    achievements: data?.achievements || [],
    milestones: data?.milestones || [],
    progress: progress || [],
    isLoading,
    updateProgress,
  };
}