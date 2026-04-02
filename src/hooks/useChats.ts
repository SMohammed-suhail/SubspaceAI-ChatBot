import { useState, useEffect, useCallback } from 'react';
import { Chat, Message } from '../types';

const STORAGE_KEY = 'subspace_chats';

function loadChats(userId: string): Chat[] {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}_${userId}`);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return parsed.map((c: any) => ({
      ...c,
      timestamp: new Date(c.timestamp),
      messages: c.messages.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }))
    }));
  } catch {
    return [];
  }
}

function persistChats(userId: string, chats: Chat[]) {
  localStorage.setItem(`${STORAGE_KEY}_${userId}`, JSON.stringify(chats));
}

export function useChats(userId?: string) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);

  useEffect(() => {
    if (!userId) return;
    const loaded = loadChats(userId);
    setChats(loaded);
    if (loaded.length > 0) setActiveChat(loaded[0]);
  }, [userId]);

  useEffect(() => {
    if (userId && chats.length > 0) persistChats(userId, chats);
  }, [chats, userId]);

  const createNewChat = useCallback(() => {
    if (!userId) return null;
    const newChat: Chat = {
      id: Date.now().toString(),
      title: `Chat ${new Date().toLocaleDateString('en-GB')} ${new Date().toLocaleTimeString('en-GB', { hour12: false })}`,
      timestamp: new Date(),
      messages: []
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChat(newChat);
    return newChat;
  }, [userId]);

  const addMessage = useCallback((chatId: string, message: Message) => {
    setChats(prev => {
      const updated = prev.map(chat =>
        chat.id === chatId ? { ...chat, messages: [...chat.messages, message], timestamp: new Date() } : chat
      );
      return updated;
    });
    setActiveChat(prev =>
      prev?.id === chatId ? { ...prev, messages: [...prev.messages, message] } : prev
    );
  }, []);

  const deleteChat = useCallback((chatId: string) => {
    if (!userId) return;
    setChats(prev => {
      const updated = prev.filter(c => c.id !== chatId);
      if (updated.length === 0) {
        persistChats(userId, []);
      }
      return updated;
    });
    setActiveChat(prev => {
      if (prev?.id === chatId) {
        const remaining = chats.filter(c => c.id !== chatId);
        return remaining.length > 0 ? remaining[0] : null;
      }
      return prev;
    });
  }, [userId, chats]);

  const selectChat = useCallback((chat: Chat) => {
    setActiveChat(chat);
  }, []);

  const renameChat = useCallback((chatId: string, newTitle: string) => {
    if (!userId || !newTitle.trim()) return;
    setChats(prev => prev.map(c => c.id === chatId ? { ...c, title: newTitle.trim() } : c));
    setActiveChat(prev => prev?.id === chatId ? { ...prev, title: newTitle.trim() } : prev);
  }, [userId]);

  return { chats, activeChat, createNewChat, addMessage, selectChat, deleteChat, renameChat };
}
