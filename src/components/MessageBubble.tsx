import React from 'react';
import { format } from 'date-fns';

interface MessageBubbleProps {
  message: {
    id: number;
    content: string;
    senderId: number;
    createdAt: string;
  };
  isOwn: boolean;
}

export default function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  return (
    <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          isOwn
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
      </div>
      <span className="text-xs text-gray-500 mt-1">
        {format(new Date(message.createdAt), 'HH:mm')}
      </span>
    </div>
  );
}