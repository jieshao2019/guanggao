import React, { useState } from 'react';
import { Search, UserPlus, MessageCircle, Users, Bell } from 'lucide-react';
import { useFriends } from '../hooks/useFriends';
import AddFriendModal from '../components/AddFriendModal';
import FriendRequest from '../components/FriendRequest';
import ChatWindow from '../components/ChatWindow';

export default function Friends() {
  const [activeTab, setActiveTab] = useState('friends');
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { friends, friendRequests, isLoading } = useFriends();

  const filteredFriends = friends?.filter(friend =>
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      {/* Header */}
      <div className="bg-white p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">好友</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowAddFriend(true)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
            >
              <UserPlus className="w-6 h-6" />
            </button>
            {friendRequests?.length > 0 && (
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full relative">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  {friendRequests.length}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索好友"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Tabs */}
        <div className="flex mt-4 border-b">
          <button
            onClick={() => setActiveTab('friends')}
            className={`flex-1 pb-2 text-sm font-medium ${
              activeTab === 'friends'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-600'
            }`}
          >
            好友
          </button>
          <button
            onClick={() => setActiveTab('online')}
            className={`flex-1 pb-2 text-sm font-medium ${
              activeTab === 'online'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-600'
            }`}
          >
            在线
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex-1 pb-2 text-sm font-medium ${
              activeTab === 'requests'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-600'
            }`}
          >
            请求
            {friendRequests?.length > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {friendRequests.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'friends' && (
          <div className="space-y-4">
            {filteredFriends?.map((friend) => (
              <div
                key={friend.id}
                className="bg-white p-4 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
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
                </div>
                <button
                  onClick={() => setSelectedChat(friend.id)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'online' && (
          <div className="space-y-4">
            {filteredFriends
              ?.filter((friend) => friend.status !== 'offline')
              .map((friend) => (
                <div
                  key={friend.id}
                  className="bg-white p-4 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                          friend.status === 'playing'
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                      ></div>
                    </div>
                    <div>
                      <h3 className="font-medium">{friend.username}</h3>
                      <p className="text-sm text-gray-500">
                        {friend.status === 'playing' ? '游戏中' : '在线'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedChat(friend.id)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
              ))}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="space-y-4">
            {friendRequests?.map((request) => (
              <FriendRequest key={request.id} request={request} />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddFriend && (
        <AddFriendModal onClose={() => setShowAddFriend(false)} />
      )}
      {selectedChat && (
        <ChatWindow
          userId={selectedChat}
          onClose={() => setSelectedChat(null)}
        />
      )}
    </div>
  );
}