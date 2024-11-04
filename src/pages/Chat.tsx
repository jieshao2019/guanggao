import React, { useState } from 'react';
import { Search, MessageCircle, Users, Plus } from 'lucide-react';
import { useMessages } from '../hooks/useMessage';
import { useFriends } from '../hooks/useFriends';
import ChatWindow from '../components/ChatWindow';
import { format } from 'date-fns';
import AddFriendModal from '../components/AddFriendModal';

export default function Chat() {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const { messages } = useMessages(selectedUser);
  const { friends, isLoading } = useFriends();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'messages' | 'friends'>('messages');

  const filteredFriends = friends?.filter(friend => 
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      {/* Header */}
      <div className="bg-white p-4 sticky top-0 z-10">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-xl font-bold">消息</h1>
          <div className="flex space-x-2">
            <button 
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-1 rounded-full ${
                activeTab === 'messages' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <MessageCircle className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveTab('friends')}
              className={`px-4 py-1 rounded-full ${
                activeTab === 'friends' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Users className="w-5 h-5" />
            </button>
            {activeTab === 'friends' && (
              <button
                onClick={() => setShowAddFriend(true)}
                className="px-4 py-1 rounded-full bg-indigo-600 text-white"
              >
                <Plus className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={activeTab === 'messages' ? "搜索聊天记录" : "搜索好友"}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Content */}
      {activeTab === 'messages' ? (
        <div className="divide-y divide-gray-200">
          {messages?.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedUser(chat.senderId)}
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
                <p className="text-sm text-gray-500 truncate">
                  {chat.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {filteredFriends?.map((friend) => (
            <div
              key={friend.id}
              onClick={() => setSelectedUser(friend.id)}
              className="bg-white p-4 flex items-center space-x-3 cursor-pointer hover:bg-gray-50"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                  friend.status === 'online' ? 'bg-green-500' :
                  friend.status === 'playing' ? 'bg-yellow-500' :
                  'bg-gray-500'
                }`}></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <h3 className="font-medium">{friend.username}</h3>
                  <span className="text-xs text-gray-400">
                    {friend.status === 'playing' ? '游戏中' :
                     friend.status === 'online' ? '在线' : '离线'}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  VIP {friend.vipLevel}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chat Window */}
      {selectedUser && (
        <ChatWindow
          userId={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

      {/* Add Friend Modal */}
      {showAddFriend && (
        <AddFriendModal onClose={() => setShowAddFriend(false)} />
      )}
    </div>
  );
}