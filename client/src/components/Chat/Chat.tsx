import { useAtom } from 'jotai';
import { currentChatUserAtom, userAtom } from '../../atom/user';
import ChatContainer from './ChatContainer';
import ChatHeader from './ChatHeader';
import MessageBar from './MessageBar';

const Chat = () => {
  const [user] = useAtom(userAtom);
  const [currentChatUser] = useAtom(currentChatUserAtom);

  return (
    <div className="bg-light-shade shadow-inner w-full flex flex-col h-[100vh]  items-center">
      {currentChatUser && user && (
        <>
          <ChatHeader currentChatUser={currentChatUser} />
          <ChatContainer user={user} currentChatUser={currentChatUser} />
          <MessageBar user={user} currentChatUser={currentChatUser} />
        </>
      )}
    </div>
  );
};

export default Chat;
