import { useAtom } from 'jotai';
import { userAtom } from '../../atom/user';
import type { GroupWithMemberModel, UserModel } from '../../interfaces';
import { Loading } from '../common/Loading/Loading';
import Contact from './Contact';

type ContactListProps = {
  userContactList: UserModel[];
  groupList: GroupWithMemberModel[];
};

const ContactList = ({ userContactList, groupList }: ContactListProps) => {
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
      {groupList.length > 0 &&
        groupList.map(
          (group) =>
            group.userId !== user.uid && (
              <div key={group.user.uid}>
                <Contact contact={group.user} />
              </div>
            )
        )}
    </div>
  );
};

export default ContactList;
