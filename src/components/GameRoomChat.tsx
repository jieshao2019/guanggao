import React, { useState, useRef, useEffect } from 'react';
import { Send, Image } from 'lucide-react';
import { useGameRoom } from '../hooks/useGameRoom';

interface GameRoomChatProps {
  roomId: number;
}

export default function GameRoomChat({ roomId }: GameRoomChatProps) {
  const [message, setMessage] = useState('');
  const { room, sendMessage } = useGameRoom(undefined, roomId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [room?.messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || sendMessage.isLoading) return;

    sendMessage.mutate(message, {
      onSuccess: () => {
        setMessage('');
      },
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {room?.messages?.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.userId === room.players?.[0].id ? 'items-end' : 'items-start'
            }`}
          >
            <div className="flex items-end space-x-2">
              <span className="text-xs text-gray-500">{msg.username}</span>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.userId === room.players?.[0].id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap break-words">
                  {msg.content}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
        <div className="flex space-x-2">
          <button
            type="button"
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
          >
            <Image className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="发送消息..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={!message.trim() || sendMessage.isLoading}
            className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}