import { useState } from 'react';
import type { FullConversationModel, UserModel } from '../../interfaces';
import ChatListHeader from './ChatBarHeader';
import ChatBarList from './ChatBarList';
import SearchBar from './SearchBar';

const ChatBar = () => {
  const [userList, setUserList] = useState<UserModel[]>([]);
  const [conversationList, setConversationList] = useState<FullConversationModel[]>([]);

  return (
    <div className="bg-light-shade flex flex-col max-h-screen z-20">
      <div>
        <ChatListHeader
          setUserContactList={setUserList}
          setConversationList={setConversationList}
        />
        <SearchBar />
        <ChatBarList userList={userList} conversationList={conversationList} />
      </div>
    </div>
  );
};

export default ChatBar;
