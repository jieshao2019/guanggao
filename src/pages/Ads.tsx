import React, { useState } from 'react';
import { Play, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AdProgress from '../components/AdProgress';
import AdStats from '../components/AdStats';
import VideoAd from '../components/VideoAd';
import AdReward from '../components/AdReward';

export default function Ads() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();

  const maxDailyAds = user?.vipLevel ? (user.vipLevel + 1) * 5 : 5;
  const remainingAds = maxDailyAds - (user?.dailyAdViews || 0);

  const handleAdComplete = (points: number) => {
    setIsPlaying(false);
    setEarnedPoints(points);
    setShowReward(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
        <h1 className="text-xl font-bold mb-4">观看广告赚积分</h1>
        <AdProgress />
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* Available Ad */}
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="aspect-video bg-gray-900 relative flex items-center justify-center">
            {remainingAds > 0 ? (
              <button
                onClick={() => setIsPlaying(true)}
                className="bg-indigo-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-indigo-700 transition-colors"
              >
                <Play className="w-5 h-5" />
                <span>观看广告</span>
              </button>
            ) : (
              <div className="text-center text-white">
                <p className="font-medium mb-2">今日观看次数已达上限</p>
                <button 
                  onClick={() => navigate('/vip')}
                  className="bg-white/20 text-white px-4 py-2 rounded-full text-sm hover:bg-white/30"
                >
                  升级VIP获取更多次数
                </button>
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">推荐广告</h3>
                <p className="text-sm text-gray-600">时长: 30秒</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-indigo-600">+30</p>
                <p className="text-sm text-gray-600">积分</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <AdStats 
          todayEarnings={earnedPoints}
          remainingAds={remainingAds}
          totalEarnings={user?.points || 0}
        />

        {/* Recent History */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold">观看历史</h2>
            <button 
              onClick={() => navigate('/ads/history')}
              className="text-indigo-600 text-sm flex items-center"
            >
              查看全部
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">观看广告</p>
                  <p className="text-sm text-gray-500">2小时前</p>
                </div>
                <span className="text-indigo-600 font-medium">+30</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Ad Modal */}
      {isPlaying && (
        <VideoAd
          onClose={() => setIsPlaying(false)}
          onComplete={handleAdComplete}
        />
      )}

      {/* Reward Modal */}
      {showReward && (
        <AdReward 
          points={earnedPoints}
          onClose={() => setShowReward(false)}
        />
      )}
    </div>
  );
}