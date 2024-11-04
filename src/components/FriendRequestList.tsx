import React from 'react';
import { useFriends } from '../hooks/useFriends';
import FriendRequest from './FriendRequest';

export default function FriendRequestList() {
  const { friendRequests, isLoading } = useFriends();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  if (!friendRequests?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">暂无好友请求</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {friendRequests.map((request) => (
        <FriendRequest key={request.id} request={request} />
      ))}
    </div>
  );
}