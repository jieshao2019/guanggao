import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Image, Smile, Send, MoreVertical } from 'lucide-react';
import { useSocket } from '../hooks/useSocket';
import { format } from 'date-fns';

export default function ChatRoom() {
  const { id } = useParams();
  const socket = useSocket();
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      senderId: 1,
      content: '你好！',
      timestamp: new Date(),
    },
    // ... more messages
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    socket?.emit('chat_message', {
      roomId: id,
      content: message
    });
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/chat" className="text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="ml-4">
            <h1 className="font-bold">群聊名称</h1>
            <p className="text-sm text-gray-500">3人在线</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreVertical className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.senderId === 1 ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[70%] ${
              msg.senderId === 1
                ? 'bg-indigo-600 text-white'
                : 'bg-white'
            } rounded-lg p-3`}>
              <p className="text-sm">{msg.content}</p>
              <p className="text-xs text-right mt-1 opacity-80">
                {format(msg.timestamp, 'HH:mm')}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <button
            type="button"
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
          >
            <Image className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={() => setShowEmoji(!showEmoji)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
          >
            <Smile className="w-6 h-6" />
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
            className="p-2 bg-indigo-600 text-white rounded-full"
          >
            <Send className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
}