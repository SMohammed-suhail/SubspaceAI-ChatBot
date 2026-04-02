import React, { useState } from 'react';
import { MessageCircle, Plus, LogOut, Trash2, Check, X } from 'lucide-react';
import { Chat } from '../types';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from './ui/alert-dialog';

interface ChatListProps {
  chats: Chat[];
  activeChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
  onNewChat: () => void;
  onSignOut: () => void;
  onDeleteChat: (chatId: string) => void;
  onRenameChat: (chatId: string, newTitle: string) => void;
}

export default function ChatList({ chats, activeChat, onSelectChat, onNewChat, onSignOut, onDeleteChat, onRenameChat }: ChatListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const startRename = (chat: Chat, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(chat.id);
    setEditValue(chat.title);
  };

  const confirmRename = () => {
    if (editingId && editValue.trim()) {
      onRenameChat(editingId, editValue);
    }
    setEditingId(null);
  };

  return (
    <div className="w-64 bg-gradient-to-b from-blue-600 to-purple-700 text-white flex flex-col h-full">
      <div className="p-4 border-b border-white/20">
        <h2 className="text-lg font-semibold mb-3">Your Chats</h2>
        <button onClick={onNewChat}
          className="w-full bg-white/20 hover:bg-white/30 rounded-lg p-3 flex items-center justify-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">New Chat</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {chats.map((chat) => (
          <div key={chat.id}
            className={`w-full text-left p-3 rounded-lg transition-colors group flex items-start gap-2 ${activeChat?.id === chat.id ? 'bg-white/30' : 'bg-white/10 hover:bg-white/20'}`}>
            <button onClick={() => onSelectChat(chat)} className="flex items-start space-x-3 min-w-0 flex-1 text-left">
              <MessageCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                {editingId === chat.id ? (
                  <div className="flex items-center gap-1">
                    <input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') confirmRename(); if (e.key === 'Escape') setEditingId(null); }}
                      onClick={(e) => e.stopPropagation()}
                      autoFocus
                      className="text-sm bg-white/20 rounded px-1 py-0.5 w-full text-white outline-none"
                    />
                    <button onClick={(e) => { e.stopPropagation(); confirmRename(); }} className="p-0.5"><Check className="w-3 h-3" /></button>
                    <button onClick={(e) => { e.stopPropagation(); setEditingId(null); }} className="p-0.5"><X className="w-3 h-3" /></button>
                  </div>
                ) : (
                  <p className="text-sm font-medium truncate cursor-pointer hover:underline" onClick={(e) => startRename(chat, e)}>{chat.title}</p>
                )}
                <p className="text-xs text-white/70">{chat.messages.length} messages</p>
              </div>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setDeleteId(chat.id); }}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/20 rounded transition-all flex-shrink-0"
              title="Delete chat"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-white/20">
        <button onClick={onSignOut}
          className="w-full bg-white/10 hover:bg-white/20 rounded-lg p-3 flex items-center justify-center space-x-2 transition-colors">
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete chat?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. This chat and all its messages will be permanently deleted.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (deleteId) onDeleteChat(deleteId); setDeleteId(null); }} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
