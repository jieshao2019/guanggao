import React, { useState } from 'react';
import { Send, Image, Smile } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
}

export default function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    onSend(message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="border-t bg-white p-3">
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
          disabled={!message.trim() || isLoading}
          className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}