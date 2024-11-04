import React from 'react';
import { ArrowLeft, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default function WalletHistory() {
  const transactions = [
    {
      id: 1,
      type: 'income',
      amount: 30,
      description: '观看广告奖励',
      date: new Date(),
    },
    {
      id: 2,
      type: 'withdraw',
      amount: 100,
      description: '提现到PayPal',
      date: new Date(Date.now() - 86400000),
    },
    // ... more transactions
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white">
        <div className="px-4 py-3 flex items-center">
          <Link to="/wallet" className="text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="ml-4 text-xl font-bold">交易记录</h1>
        </div>
      </div>

      {/* Transactions */}
      <div className="p-4">
        <div className="bg-white rounded-lg">
          <div className="divide-y">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'income' 
                      ? 'bg-green-100' 
                      : 'bg-red-100'
                  }`}>
                    {transaction.type === 'income' ? (
                      <ArrowDownLeft className={`w-5 h-5 text-green-600`} />
                    ) : (
                      <ArrowUpRight className={`w-5 h-5 text-red-600`} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-500">
                      {format(transaction.date, 'yyyy-MM-dd HH:mm')}
                    </p>
                  </div>
                </div>
                <span className={`font-medium ${
                  transaction.type === 'income'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}