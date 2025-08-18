import React from 'react';
import { MessageCircle, Plus } from 'lucide-react';
import { Chat } from '../types';

interface ChatListProps {
  chats: Chat[];
  activeChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
  onNewChat: () => void;
  onSignOut: () => void;
}

export default function ChatList({ chats, activeChat, onSelectChat, onNewChat, onSignOut }: ChatListProps) {
  return (
    <div className="w-64 bg-gradient-to-b from-blue-600 to-purple-700 text-white flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-white/20">
        <h2 className="text-lg font-semibold mb-3">Your Chats</h2>
        <button
          onClick={onNewChat}
          className="w-full bg-white/20 hover:bg-white/30 rounded-lg p-3 flex items-center justify-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">New Chat</span>
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              activeChat?.id === chat.id
                ? 'bg-white/30'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <div className="flex items-start space-x-3">
              <MessageCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">
                  Chat from
                </p>
                <p className="text-xs text-white/70">
                  {chat.timestamp.toLocaleDateString('en-GB')}, {chat.timestamp.toLocaleTimeString('en-GB', { hour12: false })}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Sign Out */}
      <div className="p-4 border-t border-white/20">
        <button
          onClick={onSignOut}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}