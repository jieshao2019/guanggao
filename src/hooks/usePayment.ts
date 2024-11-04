import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

interface PaymentMethod {
  id: number;
  name: string;
  type: string;
  minAmount: number;
  maxAmount: number;
  fee: number;
}

interface PaymentRecord {
  id: number;
  amount: number;
  fee: number;
  status: string;
  createdAt: string;
}

export function usePayment() {
  const queryClient = useQueryClient();

  const { data: methods } = useQuery<PaymentMethod[]>(
    'paymentMethods',
    async () => {
      const { data } = await axios.get('/api/payment/methods');
      return data;
    }
  );

  const { data: records } = useQuery<PaymentRecord[]>(
    'paymentRecords',
    async () => {
      const { data } = await axios.get('/api/payment/records');
      return data;
    }
  );

  const withdraw = useMutation<void, unknown, { amount: number; methodId: number }>(
    async ({ amount, methodId }) => {
      await axios.post('/api/payment/withdraw', { amount, methodId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('paymentRecords');
        queryClient.invalidateQueries('user');
      },
    }
  );

  const recharge = useMutation<void, unknown, { amount: number; methodId: number }>(
    async ({ amount, methodId }) => {
      await axios.post('/api/payment/recharge', { amount, methodId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('paymentRecords');
        queryClient.invalidateQueries('user');
      },
    }
  );

  return {
    methods,
    records,
    withdraw,
    recharge,
  };
}