import { useContext } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { MdCall, MdSearch, MdVideocam } from 'react-icons/md';
import Avatar from '../common/Avatar';
import { Loading } from '../common/Loading/Loading';
import { CurrentChatContext } from './Chat';

const ChatHeader = () => {
  const currentChatUser = useContext(CurrentChatContext);

  if (!currentChatUser) return <Loading visible />;

  return (
    <div className="h-16 px-4 py-3 w-full flex justify-between items-center bg-light-shade z-10 shadow-sm ">
      <div className="flex items-center justify-center gap-6">
        <Avatar type="sm" image={currentChatUser.avatar} />
        <div className="flex flex-col">
          <span className="text-primary text-base text-bold">{currentChatUser.displayName}</span>
          <span className=" text-secondary text-sm">Online | Offline</span>
        </div>
      </div>
      <div className="flex gap-3">
        <MdCall className="text-main cursor-pointer text-xl" />
        <MdVideocam className="text-main cursor-pointer text-xl" />
        <MdSearch className="text-main cursor-pointer text-xl" />
        <BsThreeDots className="text-main cursor-pointer text-xl" />
      </div>
    </div>
  );
};

export default ChatHeader;
