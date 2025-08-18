import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot, where, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Chat, Message } from '../types';

export function useChats(userId?: string) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);

  useEffect(() => {
    if (!userId) return;

    // Load chats from Firestore
    const chatsRef = collection(db, 'users', userId, 'chats');
    const q = query(chatsRef, orderBy('timestamp', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const firestoreChats = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          timestamp: data.timestamp.toDate(),
          messages: data.messages.map((msg: any) => ({
            ...msg,
            timestamp: msg.timestamp.toDate()
          }))
        };
      });
      setChats(firestoreChats);
      if (firestoreChats.length > 0 && !activeChat) {
        setActiveChat(firestoreChats[0]);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  const saveChat = async (chat: Chat) => {
    if (!userId) return;
    
    try {
      const chatsRef = collection(db, 'users', userId, 'chats');
      
      // Check if chat already exists
      const existingChatQuery = query(chatsRef, where('id', '==', chat.id));
      const existingChatSnapshot = await getDocs(existingChatQuery);
      
      if (existingChatSnapshot.empty) {
        // Create new chat
        await addDoc(chatsRef, {
          id: chat.id,
          title: chat.title,
          timestamp: chat.timestamp,
          messages: chat.messages
        });
      } else {
        // Update existing chat
        const docRef = existingChatSnapshot.docs[0].ref;
        await updateDoc(docRef, {
          messages: chat.messages,
          timestamp: new Date()
        });
      }
    } catch (error) {
      console.error('Error saving chat:', error);
    }
  };

  const createNewChat = async () => {
    if (!userId) return null;
    
    const newChat: Chat = {
      id: Date.now().toString(),
      title: `Chat from ${new Date().toLocaleDateString('en-GB')} ${new Date().toLocaleTimeString('en-GB', { hour12: false })}`,
      timestamp: new Date(),
      messages: []
    };
    
    await saveChat(newChat);
    setActiveChat(newChat);
    return newChat;
  };

  const addMessage = async (chatId: string, message: Message) => {
    if (!userId) return;
    
    // Update local state immediately
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === chatId 
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      )
    );
    
    // Update active chat if it's the current one
    if (activeChat?.id === chatId) {
      setActiveChat(prev => prev ? { ...prev, messages: [...prev.messages, message] } : null);
    }
    
    // Save to Firestore in background
    try {
      const chatToUpdate = chats.find(chat => chat.id === chatId);
      if (chatToUpdate) {
        const updatedChat = {
          ...chatToUpdate,
          messages: [...chatToUpdate.messages, message]
        };
        await saveChat(updatedChat);
      }
    } catch (error) {
      console.error('Error saving message to Firestore:', error);
    }
  };

  const selectChat = (chat: Chat) => {
    setActiveChat(chat);
  };

  return {
    chats,
    activeChat,
    createNewChat,
    addMessage,
    selectChat
  };
}