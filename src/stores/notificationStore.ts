import create from 'zustand';
import { useNotificationsApi } from '../hooks/useApi';

interface Notification {
  id: number;
  type: string;
  title: string;
  content: string;
  read: boolean;
  createdAt: string;
}

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markAsRead: (notificationId: number) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}

export const useNotificationStore = create<NotificationStore>((set, get) => {
  const notificationsApi = useNotificationsApi();

  return {
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null,

    fetchNotifications: async () => {
      try {
        set({ loading: true, error: null });
        const notifications = await notificationsApi.getNotifications();
        set({
          notifications,
          unreadCount: notifications.filter(n => !n.read).length,
          loading: false
        });
      } catch (error) {
        set({ error: 'Failed to fetch notifications', loading: false });
      }
    },

    markAsRead: async (notificationId) => {
      try {
        set({ loading: true, error: null });
        await notificationsApi.markAsRead(notificationId);
        set((state) => ({
          notifications: state.notifications.map(n =>
            n.id === notificationId ? { ...n, read: true } : n
          ),
          unreadCount: state.unreadCount - 1,
          loading: false
        }));
      } catch (error) {
        set({ error: 'Failed to mark notification as read', loading: false });
      }
    },

    markAllAsRead: async () => {
      try {
        set({ loading: true, error: null });
        await notificationsApi.markAllAsRead();
        set((state) => ({
          notifications: state.notifications.map(n => ({ ...n, read: true })),
          unreadCount: 0,
          loading: false
        }));
      } catch (error) {
        set({ error: 'Failed to mark all notifications as read', loading: false });
      }
    },
  };
});