import { format } from 'date-fns';
import { useAtom } from 'jotai';
import { useCallback, useMemo } from 'react';
import { conversationAtom } from '../../atom/conversation';
import { userAtom } from '../../atom/user';
import useOtherUser from '../../hooks/useOtherUser';
import type { FullConversationModel } from '../../interfaces';
import Avatar from '../common/Avatar';

type ConversationBoxProps = {
  conversation: FullConversationModel;
};

const ConversationBox = ({ conversation }: ConversationBoxProps) => {
  const [user] = useAtom(userAtom);
  const [, setCurrentConversation] = useAtom(conversationAtom);

  // Conversation contains user other than current user
  const otherUser = useOtherUser(conversation);

  const lastMessage = useMemo(() => {
    const messages = conversation.messages || [];
    return messages[messages.length - 1];
  }, [conversation.messages]);

  // Check if current user see the latest message yet or not
  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;
    if (!user) return false;

    const seenArray = lastMessage.seen || [];
    return seenArray.filter((member) => member.userId === user.uid).length !== 0;
  }, [lastMessage, user]);

  // Last message sent by other user
  const lastMessageText = useMemo(() => {
    if (lastMessage?.type === 'image') return 'Sent an image';
    if (lastMessage?.type === 'text') return lastMessage.message;

    return 'Started a conversation';
  }, [lastMessage]);

  // Set current conversation to user click and get all chat in those conversation
  const handleChangeChat = useCallback(async () => {
    setCurrentConversation(conversation);
  }, [conversation, setCurrentConversation]);

  return (
    <>
      {otherUser && (
        <div
          className="flex items-center cursor-pointer hover:bg-searchbar-bg"
          onClick={handleChangeChat}
        >
          <div className="min-w-fit px-5 py-2 flex items-center">
            {/* Add condition for group later */}
            <Avatar type="sm" image={otherUser.user.avatar} />
          </div>
          <div className="min-h-full flex flex-col justify-center mt-3 pr-2 w-full">
            <span className="text-primary">{conversation.name || otherUser.user.displayName}</span>
            <div className="pb-2 pt-1 w-full">
              <span className="text-secondary line-clamp-1 text-sm">{lastMessageText}</span>
            </div>
          </div>
          {lastMessage?.createdAt && (
            <div className="text-secondary text-sm w-1/3 px-2">
              {format(new Date(lastMessage.createdAt), 'p')}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ConversationBox;
