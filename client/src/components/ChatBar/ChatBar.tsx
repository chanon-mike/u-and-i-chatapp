import ChatListHeader from './ChatBarHeader';
import ContactList from './ContactList';
import SearchBar from './SearchBar';

const ChatList = () => {
  return (
    <div className="bg-light-shade flex flex-col max-h-screen z-20">
      <div>
        <ChatListHeader />
        <SearchBar />
        <ContactList />
      </div>
    </div>
  );
};

export default ChatList;
