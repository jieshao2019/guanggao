import React from 'react';
import { format } from 'date-fns';
import { Check, CheckCheck } from 'lucide-react';

interface ChatBubbleProps {
  message: {
    id: number;
    content: string;
    createdAt: string;
    read: boolean;
  };
  isOwn: boolean;
}

export default function ChatBubble({ message, isOwn }: ChatBubbleProps) {
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
      <div className="flex items-center space-x-1 mt-1">
        <span className="text-xs text-gray-500">
          {format(new Date(message.createdAt), 'HH:mm')}
        </span>
        {isOwn && (
          message.read ? (
            <CheckCheck className="w-4 h-4 text-indigo-600" />
          ) : (
            <Check className="w-4 h-4 text-gray-400" />
          )
        )}
      </div>
    </div>
  );
}