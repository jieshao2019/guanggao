import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

interface SignInStatus {
  signedIn: boolean;
  consecutiveDays: number;
}

interface SignInReward {
  points: number;
  day: number;
  consecutiveDays: number;
}

export function useSignIn() {
  const queryClient = useQueryClient();

  const { data: status, isLoading } = useQuery<SignInStatus>(
    'signInStatus',
    async () => {
      const { data } = await axios.get('/api/signin/status');
      return data;
    }
  );

  const signIn = useMutation<SignInReward>(
    async () => {
      const { data } = await axios.post('/api/signin');
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('signInStatus');
        queryClient.invalidateQueries('user');
      },
    }
  );

  return {
    status,
    isLoading,
    signIn,
  };
}