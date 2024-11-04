import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface VideoAdProps {
  onClose: () => void;
  onComplete: (points: number) => void;
}

export default function VideoAd({ onClose, onComplete }: VideoAdProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [canSkip, setCanSkip] = useState(false);

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

  const handleComplete = () => {
    const points = Math.floor((30 - timeLeft) / 30 * 30);
    onComplete(points);
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
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

        {/* Skip Button */}
        {canSkip && (
          <button
            onClick={handleComplete}
            className="absolute top-4 right-4 bg-white/20 text-white px-4 py-2 rounded-full hover:bg-white/30"
          >
            跳过广告
          </button>
        )}
      </div>
    </div>
  );
}