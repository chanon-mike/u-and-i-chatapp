import { useAtom } from 'jotai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { userAtom } from '../../atom/user';
import Avatar from '../common/Avatar';
import { Loading } from '../common/Loading/Loading';

const ChatListHeader = () => {
  const [user] = useAtom(userAtom);

  if (!user) return <Loading visible />;

  return (
    <div className="h-16 px-4 py-3 flex justify-between gap-5 items-center bg-panel-header-bg">
      <div className="cursor-pointer">
        <Avatar type="sm" image={user.avatar} />
      </div>
      <div className="flex gap-4">
        <BsThreeDotsVertical className="text-panel-header-icon cursor-pointer text-xl" />
      </div>
      {/* <span className="text-white">{user.displayName}</span> */}
    </div>
  );
};

export default ChatListHeader;
