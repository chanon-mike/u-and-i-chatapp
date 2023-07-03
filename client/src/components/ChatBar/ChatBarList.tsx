import { useAtom } from 'jotai';
import { userAtom } from '../../atom/user';
import type { FullConversationModel, UserModel } from '../../interfaces';
import { Loading } from '../common/Loading/Loading';
import ConversationBox from './ConversationBox';
import UserBox from './UserBox';

type UserListProps = {
  userList: UserModel[];
  conversationList: FullConversationModel[];
};

const ChatBarList = ({ userList, conversationList }: UserListProps) => {
  const [user] = useAtom(userAtom);
  // const [allConversation, setAllConversation] = useState<FullConversationModel[]>([]);

  // useEffect(() => {
  //   // If conversation list
  //   if (user && conversationList.length > 0) {
  //     const newConversationList = conversationList.map((conversation) => conversation);
  //   }
  // }, [conversationList, user]);

  if (!user) return <Loading visible />;

  return (
    <div className="flex-auto overflow-auto max-h-full custom-scrollbar">
      {userList.length > 0 &&
        userList.map(
          (contact) => user.uid !== contact.uid && <UserBox contact={contact} key={contact.uid} />
        )}
      {conversationList.length > 0 &&
        conversationList.map((conversation) => (
          <ConversationBox conversation={conversation} key={conversation.id} />
        ))}
    </div>
  );
};

export default ChatBarList;
