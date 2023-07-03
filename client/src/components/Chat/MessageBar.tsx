import { useAtom } from 'jotai';
import { useContext, useState } from 'react';
import { BsEmojiSmile, BsImage, BsMicFill } from 'react-icons/bs';
import { IoMdSend } from 'react-icons/io';
import { messageApiClient } from '../../api/message';
import { userAtom } from '../../atom/user';
import type { FullConversationModel } from '../../interfaces';
import { CurrentChatContext } from './Chat';

type ChatContainerProps = {
  conversation: FullConversationModel;
};

const MessageBar = ({ conversation }: ChatContainerProps) => {
  const currentChatUser = useContext(CurrentChatContext);
  const [user] = useAtom(userAtom);
  const [message, setMessage] = useState<string>('');

  // Send a new message
  const sendMessage = async () => {
    if (user && currentChatUser) {
      const body = {
        type: 'text',
        message,
        senderUid: user.uid,
      };
      await messageApiClient.sendMessage(conversation.id, body);
    }
  };

  return (
    <div className=" bg-light-shade h-20 px-4 flex items-center gap-6 relative w-full shadow-[0_3px_10px_rgb(0,0,0,0.1)]">
      <div className="flex items-center gap-5 w-full">
        <div className="flex gap-5 justify-center">
          <BsEmojiSmile className="text-main cursor-pointer text-xl" />
          <BsImage className="text-main cursor-pointer text-xl" />
          <BsMicFill className="text-main cursor-pointer text-xl" />
        </div>
        <div className="bg-searchbar-bg flex h-10 rounded-lg w-full">
          <input
            type="text"
            placeholder="Aa"
            className="bg-transparent text-sm px-3 py-1 w-full focus:outline-none text-primary"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </div>
        <button className="flex w-10 justify-center" onClick={sendMessage}>
          <IoMdSend className="text-main cursor-pointer text-xl" />
        </button>
      </div>
    </div>
  );
};

export default MessageBar;
