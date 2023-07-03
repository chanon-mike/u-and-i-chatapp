import { format } from 'date-fns';
import { useAtom } from 'jotai';
import { useCallback, useContext, useEffect, useState } from 'react';
import { messageApiClient } from '../../api/message';
import { userAtom } from '../../atom/user';
import type { FullConversationModel, FullMessageModel, MessageModel } from '../../interfaces';
import Avatar from '../common/Avatar';
import { CurrentChatContext } from './Chat';

type ChatContainerProps = {
  conversation: FullConversationModel;
};

const ChatContainer = ({ conversation }: ChatContainerProps) => {
  const [messages, setMessages] = useState<FullMessageModel[]>([]);
  const [user] = useAtom(userAtom);
  const currentChatUser = useContext(CurrentChatContext);

  useEffect(() => {
    // Fetch messages
    const fetchMessages = async () => {
      const response = await messageApiClient.getMessages(conversation.id);
      if (response) {
        setMessages(response);
      }
    };
    fetchMessages();
  }, [conversation.id]);

  const isSend = useCallback((msg: MessageModel) => msg.senderUid === user?.uid, [user?.uid]);

  return (
    <>
      {user && currentChatUser && (
        <div className="h-[80vh] w-full relative flex-grow overflow-auto custom-scrollbar">
          <div className="flex flex-col justify-end gap-2 mr-10 my-6 relative bottom-0 z-40 left-0">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end ${isSend(msg) ? 'justify-end' : 'justify-start'}`}
              >
                {/* Avatar or time sent for current user */}
                {!isSend(msg) ? (
                  <div className="flex justify-start px-2">
                    <Avatar type="sm" image={msg.sender.avatar} />
                  </div>
                ) : (
                  <div className="flex px-2 text-[12px] text-secondary">
                    {format(new Date(msg.createdAt), 'p')}
                  </div>
                )}
                {/* Message */}
                <div
                  className={`px-2 py-1 text-sm rounded-2xl max-w-[65%] break-all ${
                    isSend(msg) ? 'bg-main text-white' : 'bg-white text-primary'
                  }`}
                >
                  {msg.message}
                </div>
                {/* Time message sent for non-current user */}
                {!isSend(msg) && (
                  <div className="flex px-2 text-[12px] text-secondary">
                    {format(new Date(msg.createdAt), 'p')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatContainer;
