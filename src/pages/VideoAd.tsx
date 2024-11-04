import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, X } from 'lucide-react';
import { useAds } from '../hooks/useAds';
import { useNavigate } from 'react-router-dom';

export default function VideoAd() {
  const [isMuted, setIsMuted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [canSkip, setCanSkip] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { completeAd } = useAds();
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      handleComplete();
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft <= 15) {
      setCanSkip(true);
    }
  }, [timeLeft]);

  const handleComplete = async () => {
    try {
      const result = await completeAd.mutateAsync({ duration: 30 - timeLeft });
      navigate('/ads/complete', { state: { points: result.points } });
    } catch (error) {
      console.error('Error completing ad:', error);
    }
  };

  const videoUrls = [
    'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  ];

  const randomVideoUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)];

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Video Container */}
      <div className="relative h-full w-full">
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          src={randomVideoUrl}
          autoPlay
          muted={isMuted}
          playsInline
        />

        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
          <div className="text-white">
            <p className="text-sm font-medium">观看奖励</p>
            <p className="text-xs opacity-80">+{Math.floor((30 - timeLeft) / 30 * 30)}积分</p>
          </div>
          {canSkip && (
            <button 
              onClick={handleComplete}
              className="text-white px-4 py-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              跳过广告
            </button>
          )}
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6" />
              ) : (
                <Volume2 className="w-6 h-6" />
              )}
            </button>
            <div className="w-full mx-4">
              <div className="bg-white/30 rounded-full h-1">
                <div 
                  className="bg-white h-1 rounded-full transition-all duration-1000"
                  style={{ width: `${((30 - timeLeft) / 30) * 100}%` }}
                ></div>
              </div>
            </div>
            <span className="text-white text-sm">0:{timeLeft.toString().padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}