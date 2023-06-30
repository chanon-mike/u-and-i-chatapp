import { useState } from 'react';
import type { ConversationWithMemberModel, UserModel } from '../../interfaces';
import ChatListHeader from './ChatBarHeader';
import ContactList from './ContactList';
import SearchBar from './SearchBar';

const ChatBar = () => {
  const [userContactList, setUserContactList] = useState<UserModel[]>([]);
  const [conversationList, setConversationList] = useState<ConversationWithMemberModel[]>([]);

  return (
    <div className="bg-light-shade flex flex-col max-h-screen z-20">
      <div>
        <ChatListHeader
          setUserContactList={setUserContactList}
          setConversationList={setConversationList}
        />
        <SearchBar />
        <ContactList userContactList={userContactList} conversationList={conversationList} />
      </div>
    </div>
  );
};

export default ChatBar;
