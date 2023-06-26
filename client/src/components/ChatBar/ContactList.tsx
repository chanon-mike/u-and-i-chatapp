import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { userApiClient } from '../../api/user';
import { userAtom } from '../../atom/user';
import type { UserModel } from '../../interfaces';
import { Loading } from '../common/Loading/Loading';
import Contact from './Contact';

const ContactList = () => {
  const [user] = useAtom(userAtom);
  const [userContactList, setUserContactList] = useState<UserModel[]>([]);

  const fetchAllUser = async () => {
    const response = await userApiClient.getAllUserData();
    if (response) setUserContactList(response);
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  if (!user) return <Loading visible />;

  return (
    <div className="flex-auto overflow-auto max-h-full custom-scrollbar">
      {userContactList.map(
        (contact) =>
          user.uid !== contact.uid && (
            <div key={contact.uid}>
              <Contact contact={contact} />
            </div>
          )
      )}
    </div>
  );
};

export default ContactList;
