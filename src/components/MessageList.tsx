import React, { useRef, useEffect } from 'react';
import { useMessages } from '../hooks/useMessage';
import MessageBubble from './MessageBubble';

interface MessageListProps {
  userId: number;
}

export default function MessageList({ userId }: MessageListProps) {
  const { messages } = useMessages(userId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages?.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          isOwn={message.senderId !== userId}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}