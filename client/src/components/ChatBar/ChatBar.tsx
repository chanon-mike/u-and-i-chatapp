import { useState } from 'react';
import type { GroupWithMemberModel, UserModel } from '../../interfaces';
import ChatListHeader from './ChatBarHeader';
import ContactList from './ContactList';
import SearchBar from './SearchBar';

const ChatBar = () => {
  const [userContactList, setUserContactList] = useState<UserModel[]>([]);
  const [groupList, setGroupList] = useState<GroupWithMemberModel[]>([]);

  return (
    <div className="bg-light-shade flex flex-col max-h-screen z-20">
      <div>
        <ChatListHeader setUserContactList={setUserContactList} setGroupList={setGroupList} />
        <SearchBar />
        <ContactList userContactList={userContactList} groupList={groupList} />
      </div>
    </div>
  );
};

export default ChatBar;
