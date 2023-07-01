import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { conversationAtom } from '../../atom/conversation';
import { userAtom } from '../../atom/user';
import type { UserModel } from '../../interfaces';
import ChatContainer from './ChatContainer';
import ChatHeader from './ChatHeader';
import MessageBar from './MessageBar';

const Chat = () => {
  const [user] = useAtom(userAtom);
  const [currentConversation] = useAtom(conversationAtom);
  const [currentChat, setCurrentChat] = useState<UserModel>();

  useEffect(() => {
    // If conversation is not group
    if (user && currentConversation && !currentConversation.isGroup) {
      const newChat = currentConversation.members.filter((member) => member.userId !== user.uid)[0]
        .user;
      setCurrentChat(newChat);
    }
  }, [user, currentConversation, currentChat]);

  return (
    <div className="bg-light-shade shadow-inner w-full flex flex-col h-[100vh] items-center">
      {currentChat && user && (
        <>
          <ChatHeader currentChatUser={currentChat} />
          <ChatContainer user={user} currentChatUser={currentChat} />
          <MessageBar user={user} currentChatUser={currentChat} />
        </>
      )}
    </div>
  );
};

export default Chat;
