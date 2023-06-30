import { useAtom } from 'jotai';
import { userAtom } from '../../atom/user';
import type { ConversationWithMemberModel, UserModel } from '../../interfaces';
import { Loading } from '../common/Loading/Loading';
import Contact from './Contact';

type ContactListProps = {
  userContactList: UserModel[];
  conversationList: ConversationWithMemberModel[];
};

const ContactList = ({ userContactList, conversationList }: ContactListProps) => {
  const [user] = useAtom(userAtom);

  if (!user) return <Loading visible />;

  return (
    <div className="flex-auto overflow-auto max-h-full custom-scrollbar">
      {userContactList.length > 0 &&
        userContactList.map(
          (contact) =>
            user.uid !== contact.uid && (
              <div key={contact.uid}>
                <Contact contact={contact} />
              </div>
            )
        )}
      {conversationList.length > 0 &&
        conversationList.map((conversation) => (
          <div key={conversation.user.uid}>
            <Contact contact={conversation.user} />
          </div>
        ))}
    </div>
  );
};

export default ContactList;
