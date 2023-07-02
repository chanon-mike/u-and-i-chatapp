import { useContext, useEffect, useState } from 'react';
import { messageApiClient } from '../../api/message';
import type { FullConversationModel, MessageModel } from '../../interfaces';
import { Loading } from '../common/Loading/Loading';
import { CurrentChatContext } from './Chat';

type ChatContainerProps = {
  conversation: FullConversationModel;
};

const ChatContainer = ({ conversation }: ChatContainerProps) => {
  const [allMessage, setAllMessage] = useState<MessageModel[]>([]);
  const currentChatUser = useContext(CurrentChatContext);

  useEffect(() => {
    // Fetch messages
    const fetchMessages = async () => {
      const response = await messageApiClient.getMessages(conversation.id);
      if (response) {
        setAllMessage(response);
      }
    };
    fetchMessages();
  }, [conversation.id]);

  if (!currentChatUser) return <Loading visible />;

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
