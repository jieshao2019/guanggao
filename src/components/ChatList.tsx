import React from 'react';
import { format } from 'date-fns';
import { useMessages } from '../hooks/useMessage';

interface ChatListProps {
  onSelect: (userId: number) => void;
}

export default function ChatList({ onSelect }: ChatListProps) {
  const { messages } = useMessages();

  return (
    <div className="divide-y divide-gray-200">
      {messages?.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onSelect(chat.senderId)}
          className="bg-white p-4 flex items-center space-x-3 cursor-pointer hover:bg-gray-50"
        >
          <div className="relative">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            {!chat.read && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                1
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between">
              <h3 className="font-medium">{chat.senderName}</h3>
              <span className="text-xs text-gray-400">
                {format(new Date(chat.createdAt), 'HH:mm')}
              </span>
            </div>
            <p className="text-sm text-gray-500 truncate">{chat.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}