import { useAtom } from 'jotai';
import { userAtom } from '../../atom/user';
import type { FullConversationModel, UserModel } from '../../interfaces';
import { Loading } from '../common/Loading/Loading';
import Contact from './UserBox';

type UserListProps = {
  userList: UserModel[];
  conversationList: FullConversationModel[];
};

const UserList = ({ userList, conversationList }: UserListProps) => {
  const [user] = useAtom(userAtom);

  if (!user) return <Loading visible />;

  return (
    <div className="flex-auto overflow-auto max-h-full custom-scrollbar">
      {userList.length > 0 &&
        userList.map(
          (contact) => user.uid !== contact.uid && <Contact contact={contact} key={contact.uid} />
        )}
      {/* {conversationList.length > 0 &&
        conversationList.map((conversation) => (
          <div key={conversation.user.uid}>
            <Contact contact={conversation.user} />
          </div>
        ))} */}
    </div>
  );
};

export default UserList;
