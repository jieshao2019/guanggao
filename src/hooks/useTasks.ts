import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  description: string;
  type: string;
  requirement: number;
  points: number;
  progress: number;
  completed: boolean;
  claimed: boolean;
}

export function useTasks() {
  const queryClient = useQueryClient();

  const { data: tasks, isLoading } = useQuery<Task[]>(
    'tasks',
    async () => {
      const { data } = await axios.get('/api/tasks');
      return data;
    }
  );

  const updateProgress = useMutation<void, unknown, { taskId: number; progress: number }>(
    async ({ taskId, progress }) => {
      await axios.put(`/api/tasks/${taskId}/progress`, { progress });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
      },
    }
  );

  const claimReward = useMutation<void, unknown, number>(
    async (taskId) => {
      await axios.post(`/api/tasks/${taskId}/claim`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
        queryClient.invalidateQueries('user');
      },
    }
  );

  return {
    tasks,
    isLoading,
    updateProgress,
    claimReward,
  };
}