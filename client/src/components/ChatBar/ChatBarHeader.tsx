import { useAtom } from 'jotai';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { BsFillChatFill, BsPeopleFill, BsPersonFillAdd, BsThreeDotsVertical } from 'react-icons/bs';
import { groupApiClient } from '../../api/group';
import { userApiClient } from '../../api/user';
import { userAtom } from '../../atom/user';
import type { GroupWithMemberModel, UserModel } from '../../interfaces';
import GroupChatModal from '../Modal/GroupChatModal';
import Avatar from '../common/Avatar';
import { Loading } from '../common/Loading/Loading';

type ChatBarHeaderProps = {
  setUserContactList: Dispatch<SetStateAction<UserModel[]>>;
  setGroupList: Dispatch<SetStateAction<GroupWithMemberModel[]>>;
};

const ChatBarHeader = ({ setUserContactList, setGroupList }: ChatBarHeaderProps) => {
  const [user] = useAtom(userAtom);
  const [showGroupChatModal, setShowGroupChatModal] = useState<boolean>(false);

  const fetchAllUser = async () => {
    const response = await userApiClient.getAllUserData();
    console.log(response);
    if (response) {
      setUserContactList(response);
      setGroupList([]);
    }
  };

  const fetchCurrentUserGroup = async () => {
    const response = await groupApiClient.getCurrentUserGroup(user?.uid || '');
    console.log(response);
    if (response) {
      setUserContactList([]);
      setGroupList(response);
    }
  };

  if (!user) return <Loading visible />;

  return (
    <div className="h-16 px-4 py-3 flex justify-between gap-5 items-center bg-light-shade">
      <div className="cursor-pointer">
        <Avatar type="sm" image={user.avatar} />
      </div>
      <div className="flex gap-4">
        <BsFillChatFill
          className="text-main cursor-pointer text-xl"
          onClick={fetchCurrentUserGroup}
        />
        <BsPeopleFill className="text-main cursor-pointer text-xl" onClick={fetchAllUser} />
        <BsPersonFillAdd
          className="text-main cursor-pointer text-xl"
          onClick={() => setShowGroupChatModal(true)}
        />
        <BsThreeDotsVertical className="text-main cursor-pointer text-xl" />
      </div>
      <GroupChatModal
        showGroupChatModal={showGroupChatModal}
        setShowGroupChatModal={setShowGroupChatModal}
      />
    </div>
  );
};

export default ChatBarHeader;
