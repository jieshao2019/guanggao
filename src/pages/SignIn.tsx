import React, { useState } from 'react';
import { Calendar, Trophy, Gift } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function SignIn() {
  const { user } = useAuth();
  const [signedIn, setSignedIn] = useState(false);
  const [consecutiveDays, setConsecutiveDays] = useState(3);

  const rewards = [
    { day: 1, points: 10, claimed: true },
    { day: 2, points: 20, claimed: true },
    { day: 3, points: 30, claimed: true },
    { day: 4, points: 40, claimed: false },
    { day: 5, points: 50, claimed: false },
    { day: 6, points: 60, claimed: false },
    { day: 7, points: 100, claimed: false },
  ];

  const handleSignIn = async () => {
    try {
      // Handle sign in logic
      setSignedIn(true);
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <h1 className="text-xl font-bold mb-4">每日签到</h1>
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="text-sm opacity-90">连续签到</h3>
              <p className="text-2xl font-bold mt-1">{consecutiveDays}天</p>
            </div>
            {!signedIn && (
              <button
                onClick={handleSignIn}
                className="bg-white text-indigo-600 px-6 py-2 rounded-full font-medium"
              >
                立即签到
              </button>
            )}
          </div>
          <div className="flex items-center text-sm opacity-80">
            <Calendar className="w-4 h-4 mr-1" />
            <span>再签到4天可获得100积分奖励</span>
          </div>
        </div>
      </div>

      {/* Rewards */}
      <div className="p-4">
        <div className="bg-white rounded-lg">
          <div className="p-4 border-b">
            <h2 className="font-bold">签到奖励</h2>
          </div>
          <div className="grid grid-cols-7 gap-2 p-4">
            {rewards.map((reward, index) => (
              <div
                key={index}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center ${
                  reward.claimed
                    ? 'bg-gray-100'
                    : index === consecutiveDays
                    ? 'bg-indigo-50 border-2 border-indigo-600'
                    : 'bg-gray-50'
                }`}
              >
                <span className="text-sm text-gray-500">第{reward.day}天</span>
                <div className="my-2">
                  {reward.claimed ? (
                    <Trophy className="w-6 h-6 text-yellow-500" />
                  ) : (
                    <Gift className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <span className="text-sm font-medium">
                  +{reward.points}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sign In History */}
      <div className="p-4">
        <div className="bg-white rounded-lg">
          <div className="p-4 border-b">
            <h2 className="font-bold">签到记录</h2>
          </div>
          <div className="divide-y">
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">连续签到第{item}天</p>
                  <p className="text-sm text-gray-500">2024-03-{10-item}</p>
                </div>
                <span className="text-indigo-600">+{item * 10}积分</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}