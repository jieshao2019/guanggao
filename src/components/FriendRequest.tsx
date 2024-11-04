import React from 'react';
import { UserPlus, X, Check } from 'lucide-react';
import { useFriends } from '../hooks/useFriends';

interface FriendRequestProps {
  request: {
    id: number;
    username: string;
    vipLevel: number;
  };
}

export default function FriendRequest({ request }: FriendRequestProps) {
  const { respondToFriendRequest } = useFriends();

  const handleResponse = async (status: 'accepted' | 'rejected') => {
    try {
      await respondToFriendRequest.mutateAsync({
        userId: request.id,
        status,
      });
    } catch (error) {
      console.error('Error responding to friend request:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <UserPlus className="w-5 h-5 text-indigo-600 absolute -bottom-1 -right-1 bg-white rounded-full p-1" />
        </div>
        <div>
          <h3 className="font-medium">{request.username}</h3>
          <p className="text-sm text-gray-500">VIP {request.vipLevel}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => handleResponse('accepted')}
          className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
        >
          <Check className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleResponse('rejected')}
          className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}