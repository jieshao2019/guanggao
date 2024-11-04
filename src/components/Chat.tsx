import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useMessages } from '../hooks/useMessage';
import { format } from 'date-fns';

interface ChatProps {
  userId: number;
  onClose: () => void;
}

export default function Chat({ userId, onClose }: ChatProps) {
  const [message, setMessage] = useState('');
  const { messages, sendMessage } = useMessages(userId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    sendMessage.mutate(
      { userId, content: message },
      {
        onSuccess: () => {
          setMessage('');
        },
      }
    );
  };

  return (
    <div className="fixed bottom-16 right-4 w-80 bg-white rounded-t-lg shadow-lg">
      {/* Chat Header */}
      <div className="p-3 bg-indigo-600 text-white rounded-t-lg flex justify-between items-center">
        <h3 className="font-medium">聊天</h3>
        <button onClick={onClose} className="text-white/80 hover:text-white">
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages?.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.senderId === userId ? 'items-start' : 'items-end'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.senderId === userId
                  ? 'bg-gray-100'
                  : 'bg-indigo-600 text-white'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
            </div>
            <span className="text-xs text-gray-500 mt-1">
              {format(new Date(msg.createdAt), 'HH:mm')}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-3 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="输入消息..."
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}