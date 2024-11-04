import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Image, Smile } from 'lucide-react';
import { useMessages } from '../hooks/useMessage';
import { format } from 'date-fns';

interface ChatWindowProps {
  userId: number;
  onClose: () => void;
}

export default function ChatWindow({ userId, onClose }: ChatWindowProps) {
  const [message, setMessage] = useState('');
  const { messages, sendMessage, isLoading } = useMessages(userId);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showEmoji, setShowEmoji] = useState(false);

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
          scrollToBottom();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-white z-50">
      {/* Header */}
      <div className="bg-indigo-600 text-white px-4 py-3 flex items-center justify-between">
        <h3 className="font-medium">聊天对话</h3>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="h-[calc(100vh-128px)] overflow-y-auto p-4 space-y-4">
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
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t">
        <form onSubmit={handleSubmit} className="p-3">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
            >
              <Image className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setShowEmoji(!showEmoji)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
            >
              <Smile className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="输入消息..."
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
    </div>
  );
}