import React from 'react';
import { Trophy, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdRewardProps {
  points: number;
  onClose: () => void;
}

export default function AdReward({ points, onClose }: AdRewardProps) {
  const navigate = useNavigate();

  const handleContinue = () => {
    onClose();
    navigate('/ads');
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center p-4 z-50">
      <div className="text-center text-white">
        <div className="mb-6">
          <Trophy className="w-16 h-16 mx-auto animate-bounce" />
        </div>
        <h1 className="text-2xl font-bold mb-2">获得奖励！</h1>
        <p className="text-4xl font-bold mb-4">+{points}</p>
        <p className="text-sm opacity-80">积分已添加到您的账户</p>
        
        <button
          onClick={handleContinue}
          className="mt-8 px-6 py-3 bg-white text-indigo-600 rounded-full font-medium inline-flex items-center hover:bg-opacity-90"
        >
          继续观看
          <ChevronRight className="w-5 h-5 ml-1" />
        </button>
      </div>
    </div>
  );
}