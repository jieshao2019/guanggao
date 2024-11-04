import React, { useState } from 'react';
import { ArrowLeft, Play, Clock, Gift, Volume2, VolumeX } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useAds } from '../hooks/useAds';
import AdReward from '../components/AdReward';

export default function AdDetail() {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const { completeAd } = useAds();

  const ad = {
    id,
    title: '推荐广告',
    description: '观看完整广告获得积分奖励',
    duration: 30,
    points: 30,
    requirements: [
      '需要完整观看广告',
      'VIP用户可获得额外奖励',
      '每日观看次数有限'
    ]
  };

  const handleAdComplete = async () => {
    try {
      const result = await completeAd.mutateAsync({ duration: 30 });
      setEarnedPoints(result.points);
      setShowReward(true);
    } catch (error) {
      console.error('Error completing ad:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
        <div className="flex items-center mb-4">
          <Link to="/ads" className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="ml-3 text-xl font-bold">广告详情</h1>
        </div>
      </div>

      {/* Preview */}
      <div className="p-4">
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="aspect-video bg-gray-900 relative flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(true)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-indigo-700"
            >
              <Play className="w-5 h-5" />
              <span>观看广告</span>
            </button>
          </div>
          
          <div className="p-4">
            <h2 className="font-bold text-lg mb-2">{ad.title}</h2>
            <p className="text-gray-600 text-sm">{ad.description}</p>

            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-1" />
                <span>{ad.duration}秒</span>
              </div>
              <div className="flex items-center text-indigo-600">
                <Gift className="w-5 h-5 mr-1" />
                <span>+{ad.points}积分</span>
              </div>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="mt-4 bg-white rounded-lg p-4">
          <h3 className="font-bold mb-3">观看要求</h3>
          <ul className="space-y-2">
            {ad.requirements.map((req, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></div>
                {req}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Video Modal */}
      {isPlaying && (
        <div className="fixed inset-0 bg-black z-50">
          <VideoPlayer
            onComplete={handleAdComplete}
            onClose={() => setIsPlaying(false)}
          />
        </div>
      )}

      {/* Reward Modal */}
      {showReward && (
        <AdReward
          points={earnedPoints}
          onClose={() => {
            setShowReward(false);
            setIsPlaying(false);
          }}
        />
      )}
    </div>
  );
}

function VideoPlayer({ onComplete, onClose }: { onComplete: () => void; onClose: () => void }) {
  const [isMuted, setIsMuted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="relative h-full">
      <video
        src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        className="w-full h-full object-contain"
        autoPlay
        muted={isMuted}
        playsInline
      />

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-white p-2 hover:bg-white/10 rounded-full"
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6" />
            ) : (
              <Volume2 className="w-6 h-6" />
            )}
          </button>
          <div className="flex-1 mx-4">
            <div className="h-1 bg-white/30 rounded-full">
              <div
                className="h-1 bg-white rounded-full transition-all"
                style={{ width: `${((30 - timeLeft) / 30) * 100}%` }}
              />
            </div>
          </div>
          <span className="text-white">
            {timeLeft}s
          </span>
        </div>
      </div>
    </div>
  );
}