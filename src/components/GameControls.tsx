import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface GameControlsProps {
  onMove: (direction: 'up' | 'down' | 'left' | 'right') => void;
  onShoot: () => void;
}

export default function GameControls({ onMove, onShoot }: GameControlsProps) {
  return (
    <div className="absolute bottom-4 left-4 right-4 flex justify-between">
      {/* Movement Controls */}
      <div className="grid grid-cols-3 gap-2">
        <div className="col-start-2">
          <button
            onTouchStart={() => onMove('up')}
            className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        </div>
        <div className="col-start-1 col-end-4 flex justify-between">
          <button
            onTouchStart={() => onMove('left')}
            className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button
            onTouchStart={() => onMove('down')}
            className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white"
          >
            <ArrowDown className="w-6 h-6" />
          </button>
          <button
            onTouchStart={() => onMove('right')}
            className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Shoot Button */}
      <button
        onTouchStart={onShoot}
        className="w-16 h-16 bg-red-500/80 rounded-full flex items-center justify-center text-white font-bold"
      >
        发射
      </button>
    </div>
  );
}