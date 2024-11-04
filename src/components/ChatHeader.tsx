import React from 'react';
import { ArrowLeft, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ChatHeaderProps {
  username: string;
  status: string;
  onBack: () => void;
}

export default function ChatHeader({ username, status, onBack }: ChatHeaderProps) {
  return (
    <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="font-medium">{username}</h2>
          <p className="text-sm text-gray-500">{status}</p>
        </div>
      </div>
      <Link
        to={`/profile/${username}`}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <MoreVertical className="w-5 h-5" />
      </Link>
    </div>
  );
}