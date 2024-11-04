import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Users, MessageCircle, Gift, Crown } from 'lucide-react';
import { useSocket } from '../hooks/useSocket';

export default function GameRoom() {
  const { id } = useParams();
  const socket = useSocket();
  const [message, setMessage] = useState('');
  const [players, setPlayers] = useState([
    { id: 1, username: '玩家1', score: 1000, isReady: true },
    { id: 2, username: '玩家2', score: 800, isReady: false },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    socket?.emit('game_message', {
      gameId: id,
      content: message
    });
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
        <div className="flex justify-between items-center">
          <Link to="/games" className="text-white">
            <span className="text-xl">←</span>
          </Link>
          <h1 className="text-xl font-bold">游戏房间</h1>
          <div className="flex items-center space-x-2">
            <Users className="w-6 h-6" />
            <span>{players.length}/4</span>
          </div>
        </div>
      </div>

      {/* Players */}
      <div className="p-4">
        <div className="bg-white rounded-lg">
          <div className="p-4 border-b">
            <h2 className="font-bold">玩家列表</h2>
          </div>
          <div className="divide-y">
            {players.map((player) => (
              <div key={player.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="flex items-center">
                      <p className="font-medium">{player.username}</p>
                      {player.id === 1 && (
                        <Crown className="w-4 h-4 text-yellow-500 ml-1" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500">分数: {player.score}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  player.isReady 
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {player.isReady ? '已准备' : '未准备'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Game Chat */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="发送消息..."
              className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-full"
            >
              发送
            </button>
          </form>
        </div>
      </div>

      {/* Game Controls */}
      <div className="fixed bottom-20 left-0 right-0 p-4 flex space-x-4">
        <button className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium">
          准备
        </button>
        <button className="flex-1 bg-red-600 text-white py-3 rounded-lg font-medium">
          退出房间
        </button>
      </div>
    </div>
  );
}