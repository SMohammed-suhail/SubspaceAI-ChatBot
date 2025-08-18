import React from 'react';
import { useAuth } from './hooks/useAuth';
import { useChats } from './hooks/useChats';
import AuthScreen from './components/AuthScreen';
import ChatList from './components/ChatList';
import ChatArea from './components/ChatArea';

function App() {
  const { user, loading, signIn, signUp, signOut, resendVerification } = useAuth();
  const { chats, activeChat, createNewChat, addMessage, selectChat } = useChats(user?.email);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen onSignIn={signIn} onSignUp={signUp} onResendVerification={resendVerification} />;
  }

  return (
    <div className="h-screen flex bg-gray-100">
      <ChatList
        chats={chats}
        activeChat={activeChat}
        onSelectChat={selectChat}
        onNewChat={createNewChat}
        onSignOut={signOut}
      />
      <ChatArea
        chat={activeChat}
        onAddMessage={addMessage}
        user={user}
      />
    </div>
  );
}

export default App;