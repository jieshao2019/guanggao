import React from 'react';
import { useFriends } from '../hooks/useFriends';

export default function OnlineFriends() {
  const { friends } = useFriends();
  const onlineFriends = friends?.filter(
    (friend) => friend.status === 'online' || friend.status === 'playing'
  );

  if (!onlineFriends?.length) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg p-4 mb-4">
      <h2 className="text-sm font-medium text-gray-600 mb-3">在线好友</h2>
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {onlineFriends.map((friend) => (
          <div key={friend.id} className="flex-shrink-0 text-center">
            <div className="relative">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div
                className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                  friend.status === 'playing' ? 'bg-yellow-500' : 'bg-green-500'
                }`}
              ></div>
            </div>
            <p className="text-xs mt-1 font-medium truncate max-w-[48px]">
              {friend.username}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}