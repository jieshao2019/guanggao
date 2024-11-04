import React from 'react';
import { Smile } from 'lucide-react';

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
}

export default function EmojiPicker({ onSelect }: EmojiPickerProps) {
  const commonEmojis = ['😊', '😂', '❤️', '👍', '🎮', '🎯', '🎲', '🎪', '🎨', '🎭'];

  return (
    <div className="absolute bottom-full left-0 bg-white rounded-lg shadow-lg p-2 mb-2">
      <div className="grid grid-cols-5 gap-2">
        {commonEmojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => onSelect(emoji)}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}