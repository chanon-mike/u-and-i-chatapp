import { BsThreeDots } from 'react-icons/bs';
import { MdCall, MdSearch, MdVideocam } from 'react-icons/md';
import Avatar from '../common/Avatar';

const ChatHeader = () => {
  return (
    <div className="h-16 px-4 py-3 w-full flex justify-between items-center bg-light-shade z-10 shadow-sm ">
      <div className="flex items-center justify-center gap-6">
        <Avatar type="sm" image="/avatars/avatar1.png" />
        <div className="flex flex-col">
          <span className="text-primary text-base text-bold">DEMO USER</span>
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
