import create from 'zustand';
import { useAdApi } from '../hooks/useApi';

interface Ad {
  id: number;
  title: string;
  duration: number;
  points: number;
}

interface AdStore {
  ads: Ad[];
  currentAd: Ad | null;
  loading: boolean;
  error: string | null;
  dailyViews: number;
  maxDailyViews: number;
  fetchAds: () => Promise<void>;
  setCurrentAd: (ad: Ad | null) => void;
  completeAd: (adId: number, duration: number) => Promise<void>;
}

export const useAdStore = create<AdStore>((set, get) => {
  const adApi = useAdApi();

  return {
    ads: [],
    currentAd: null,
    loading: false,
    error: null,
    dailyViews: 0,
    maxDailyViews: 10,

    fetchAds: async () => {
      try {
        set({ loading: true, error: null });
        const ads = await adApi.getAds();
        set({ ads, loading: false });
      } catch (error) {
        set({ error: 'Failed to fetch ads', loading: false });
      }
    },

    setCurrentAd: (ad) => {
      set({ currentAd: ad });
    },

    completeAd: async (adId, duration) => {
      try {
        set({ loading: true, error: null });
        const result = await adApi.completeAd(adId, duration);
        set((state) => ({
          dailyViews: state.dailyViews + 1,
          loading: false
        }));
        return result;
      } catch (error) {
        set({ error: 'Failed to complete ad', loading: false });
        throw error;
      }
    },
  };
});