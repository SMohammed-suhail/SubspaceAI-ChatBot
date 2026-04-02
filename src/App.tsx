import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useChats } from './hooks/useChats';
import { useIsMobile } from './hooks/use-mobile';
import AuthScreen from './components/AuthScreen';
import ChatList from './components/ChatList';
import ChatArea from './components/ChatArea';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle } from './components/ui/sheet';

function App() {
  const { user, loading, signIn, signUp, signOut, resendVerification } = useAuth();
  const { chats, activeChat, createNewChat, addMessage, selectChat, deleteChat, renameChat } = useChats(user?.email);
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const handleSelectChat = (chat: any) => {
    selectChat(chat);
    if (isMobile) setSidebarOpen(false);
  };

  const sidebar = (
    <ChatList
      chats={chats}
      activeChat={activeChat}
      onSelectChat={handleSelectChat}
      onNewChat={createNewChat}
      onSignOut={signOut}
      onDeleteChat={deleteChat}
      onRenameChat={renameChat}
    />
  );

  return (
    <div className="h-screen flex bg-gray-100">
      {isMobile ? (
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="p-0 w-64">
            <SheetTitle className="sr-only">Chat sidebar</SheetTitle>
            {sidebar}
          </SheetContent>
        </Sheet>
      ) : (
        sidebar
      )}
      <div className="flex-1 flex flex-col min-w-0">
        {isMobile && (
          <button onClick={() => setSidebarOpen(true)} className="absolute top-3 left-3 z-10 bg-blue-600 text-white p-2 rounded-lg shadow-lg">
            <Menu className="w-5 h-5" />
          </button>
        )}
        <ChatArea chat={activeChat} onAddMessage={addMessage} user={user} />
      </div>
    </div>
  );
}

export default App;
