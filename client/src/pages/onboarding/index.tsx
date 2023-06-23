import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { userAtom } from '../../atom/user';

import Avatar from '../../components/common/Avatar';
import { Loading } from '../../components/common/Loading/Loading';

const Home = () => {
  const [user] = useAtom(userAtom);
  const [displayName, setDisplayName] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');

  // Set user information to corresponding data from Google
  useEffect(() => {
    const setUserData = async () => {
      if (user) {
        setDisplayName(user.displayName || '');
        setAvatar(user.photoURL || '');
      }
    };
    setUserData();
  }, [user]);

  if (!user) return <Loading visible />;

  return (
    <>
      <div className="bg-slate-900 h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl text-white mb-10">Create your profile</h2>
        <div className="grid grid-cols-2 gap-4 justify-between">
          <form className="flex flex-col mr-5 gap-3">
            <label className="text-white">Display Name </label>
            <input
              className="p-2"
              type="text"
              value={displayName}
              size={25}
              onChange={(e) => setDisplayName(e.target.value)}
            />

            <label className="text-white mt-5">Bio</label>
            <input
              className="p-2"
              type="text"
              value={bio}
              size={25}
              onChange={(e) => setBio(e.target.value)}
            />
          </form>
          <Avatar type={'xl'} image={avatar} setImage={setAvatar} />
        </div>
      </div>
    </>
  );
};

export default Home;
