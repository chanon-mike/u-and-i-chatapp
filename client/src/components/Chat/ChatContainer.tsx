import { useEffect, useState } from 'react';
import { chatApiClient } from '../../api/chat';
import type { ChatModel, UserModel } from '../../interfaces';

type ChatContainerProps = {
  user: UserModel;
  currentChatUser: UserModel;
};

const ChatContainer = ({ user, currentChatUser }: ChatContainerProps) => {
  const [allMessage, setAllMessage] = useState<ChatModel[]>([]);

  useEffect(() => {
    // Fetch messages
    const fetchMessages = async () => {
      const response = await chatApiClient.getMessages(user.uid, currentChatUser.uid);
      if (response) {
        setAllMessage(response);
      }
    };
    fetchMessages();
  }, [user, currentChatUser]);

  return (
    <div className="h-[80vh] w-full relative flex-grow overflow-auto custom-scrollbar">
      <div className="flex w-full">
        <div className="flex flex-col justify-end w-full gap-1 overflow-auto">
          {allMessage.map((msg) => (
            <div key={msg.id}>{msg.message}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
