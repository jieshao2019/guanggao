import React from 'react';
import { UserPlus } from 'lucide-react';
import { useApiQuery } from '../hooks/useApi';
import { useFriends } from '../hooks/useFriends';

export default function FriendSuggestions() {
  const { data: suggestions } = useApiQuery(
    'friendSuggestions',
    '/api/friends/suggestions'
  );
  const { sendFriendRequest } = useFriends();

  if (!suggestions?.length) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-sm font-medium text-gray-600 mb-3">好友推荐</h2>
      <div className="space-y-3">
        {suggestions.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div>
                <h3 className="font-medium">{user.username}</h3>
                <p className="text-xs text-gray-500">
                  {user.mutualFriends} 个共同好友
                </p>
              </div>
            </div>
            <button
              onClick={() => sendFriendRequest.mutate(user.id)}
              className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full"
            >
              <UserPlus className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}