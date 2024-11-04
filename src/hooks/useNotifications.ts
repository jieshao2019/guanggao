import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

interface Notification {
  id: number;
  type: string;
  title: string;
  content: string;
  read: boolean;
  createdAt: string;
}

interface NotificationSettings {
  type: string;
  enabled: boolean;
}

export function useNotifications() {
  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery<Notification[]>(
    'notifications',
    async () => {
      const { data } = await axios.get('/api/notifications');
      return data;
    }
  );

  const { data: settings } = useQuery<NotificationSettings[]>(
    'notificationSettings',
    async () => {
      const { data } = await axios.get('/api/notifications/settings');
      return data;
    }
  );

  const markAsRead = useMutation<void, unknown, number>(
    async (notificationId) => {
      await axios.put(`/api/notifications/${notificationId}/read`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('notifications');
      },
    }
  );

  const updateSettings = useMutation<void, unknown, { type: string; enabled: boolean }>(
    async ({ type, enabled }) => {
      await axios.put(`/api/notifications/settings/${type}`, { enabled });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('notificationSettings');
      },
    }
  );

  return {
    notifications,
    settings,
    isLoading,
    markAsRead,
    updateSettings,
  };
}