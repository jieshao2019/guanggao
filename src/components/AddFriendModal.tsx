import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useApiQuery } from '../hooks/useApi';
import { useFriends } from '../hooks/useFriends';

interface User {
  id: number;
  username: string;
  vipLevel: number;
}

interface AddFriendModalProps {
  onClose: () => void;
}

export default function AddFriendModal({ onClose }: AddFriendModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: users, isLoading } = useApiQuery<User[]>(
    ['users', searchQuery],
    `/api/users/search?q=${searchQuery}`,
    {
      enabled: searchQuery.length >= 2,
    }
  );
  const { sendFriendRequest } = useFriends();

  const handleSendRequest = async (userId: number) => {
    try {
      await sendFriendRequest.mutateAsync(userId);
      // Show success message
    } catch (error) {
      // Show error message
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-lg">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-bold">添加好友</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索用户名或ID"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="text-center py-4 text-gray-500">搜索中...</div>
            ) : users?.length === 0 ? (
              <div className="text-center py-4 text-gray-500">未找到用户</div>
            ) : (
              users?.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div>
                      <h3 className="font-medium">{user.username}</h3>
                      <p className="text-sm text-gray-500">VIP {user.vipLevel}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSendRequest(user.id)}
                    disabled={sendFriendRequest.isLoading}
                    className="px-4 py-1 bg-indigo-600 text-white rounded-full text-sm hover:bg-indigo-700 disabled:opacity-50"
                  >
                    添加
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}