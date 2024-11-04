import React from 'react';
import { Trophy, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdRewardModalProps {
  points: number;
  onClose: () => void;
}

export default function AdRewardModal({ points, onClose }: AdRewardModalProps) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-sm w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-indigo-600" />
          </div>
          
          <h2 className="text-xl font-bold mb-2">获得奖励！</h2>
          <p className="text-3xl font-bold text-indigo-600 mb-4">+{points}</p>
          <p className="text-sm text-gray-500 mb-6">
            积分已添加到您的账户
          </p>

          <div className="space-y-2">
            <button
              onClick={() => navigate('/ads')}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
            >
              继续观看
            </button>
            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
            >
              稍后再说
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}