import ChatContainer from './ChatContainer';
import ChatHeader from './ChatHeader';
import MessageBar from './MessageBar';

const Chat = () => {
  return (
    <div className="bg-light-shade shadow-inner w-full flex flex-col h-[100vh]  items-center">
      <ChatHeader />
      <ChatContainer />
      <MessageBar />
    </div>
  );
};

export default Chat;
