import { useAtom } from 'jotai';
import { conversationApiClient } from '../../api/conversation';
import { conversationAtom } from '../../atom/conversation';
import { userAtom } from '../../atom/user';
import type { UserModel } from '../../interfaces';
import Avatar from '../common/Avatar';

type UserBoxProps = {
  contact: UserModel;
};

const UserBox = ({ contact }: UserBoxProps) => {
  const [user] = useAtom(userAtom);
  const [, setCurrentConversation] = useAtom(conversationAtom);

  const handleChangeChat = async () => {
    // setCurrentChatUser(contact);
    if (user) {
      const body = {
        currentUserId: user.uid,
        userId: contact.uid,
        isGroup: false,
      };
      const response = await conversationApiClient.postConversation(body);
      setCurrentConversation(response);
    }
  };

  return (
    <div
      className="flex items-center cursor-pointer hover:bg-searchbar-bg"
      onClick={handleChangeChat}
    >
      <div className="min-w-fit px-5 py-2 flex items-center">
        <Avatar type="sm" image={contact.avatar} />
      </div>
      <div className="min-h-full flex flex-col justify-center mt-3 pr-2 w-full">
        <span className="text-primary">{contact.displayName}</span>
        <div className="pb-2 pt-1 w-full">
          <span className="text-secondary line-clamp-1 text-sm">Start a conversation</span>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
