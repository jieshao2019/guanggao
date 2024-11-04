import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useApiQuery } from '../hooks/useApi';
import { useFriends } from '../hooks/useFriends';

export default function SearchUsers() {
  const [query, setQuery] = useState('');
  const { data: users, isLoading } = useApiQuery(
    ['users', query],
    `/api/users/search?q=${query}`,
    {
      enabled: query.length >= 2,
    }
  );
  const { sendFriendRequest } = useFriends();

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索用户名或ID"
          className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {query.length >= 2 && (
        <div className="bg-white rounded-lg shadow-lg">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">搜索中...</div>
          ) : !users?.length ? (
            <div className="p-4 text-center text-gray-500">未找到用户</div>
          ) : (
            <div className="divide-y divide-gray-200">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="p-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div>
                      <h3 className="font-medium">{user.username}</h3>
                      <p className="text-sm text-gray-500">VIP {user.vipLevel}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => sendFriendRequest.mutate(user.id)}
                    disabled={sendFriendRequest.isLoading}
                    className="px-4 py-1 bg-indigo-600 text-white rounded-full text-sm hover:bg-indigo-700 disabled:opacity-50"
                  >
                    添加好友
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}