import React from 'react';
import { MessageCircle, User } from 'lucide-react';
import { useFriends } from '../hooks/useFriends';
import { Link } from 'react-router-dom';

interface FriendListProps {
  onChatSelect?: (userId: number) => void;
}

export default function FriendList({ onChatSelect }: FriendListProps) {
  const { friends, isLoading } = useFriends();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  if (!friends?.length) {
    return (
      <div className="text-center py-8">
        <User className="w-12 h-12 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500">还没有好友</p>
        <p className="text-sm text-gray-400">快去添加好友一起玩游戏吧！</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {friends.map((friend) => (
        <div
          key={friend.id}
          className="flex items-center justify-between p-4 hover:bg-gray-50"
        >
          <Link
            to={`/profile/${friend.id}`}
            className="flex items-center space-x-3 flex-1"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div
                className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                  friend.status === 'online'
                    ? 'bg-green-500'
                    : friend.status === 'playing'
                    ? 'bg-yellow-500'
                    : 'bg-gray-500'
                }`}
              ></div>
            </div>
            <div>
              <h3 className="font-medium">{friend.username}</h3>
              <p className="text-sm text-gray-500">
                {friend.status === 'playing'
                  ? '游戏中'
                  : friend.status === 'online'
                  ? '在线'
                  : '离线'}
              </p>
            </div>
          </Link>
          {onChatSelect && (
            <button
              onClick={() => onChatSelect(friend.id)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}