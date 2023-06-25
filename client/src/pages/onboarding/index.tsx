import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { fbUserAtom } from '../../atom/user';

import { useRouter } from 'next/router';
import { userApiClient } from '../../api';
import AvatarSettings from '../../components/common/AvatarSettings';
import { Loading } from '../../components/common/Loading/Loading';

const Home = () => {
  const router = useRouter();
  const [fbUser] = useAtom(fbUserAtom);
  const [displayName, setDisplayName] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');

  // Set user information to corresponding data from firebase
  useEffect(() => {
    const setUserData = async () => {
      if (fbUser) {
        setDisplayName(fbUser.displayName || '');
        setAvatar(fbUser.photoURL || '/avatars/avatar_default.png');
      }
    };
    setUserData();
  }, [fbUser]);

  // Create user profile
  const handleCreateProfile = () => {
    const email = fbUser?.email;
    const uid = fbUser?.uid;
    if (email && uid) {
      const data = {
        uid,
        email,
        displayName,
        bio,
        avatar,
      };
      fbUser?.getIdToken().then(async (tkn) => {
        await userApiClient.createUserProfile(tkn, data);
      });
      router.push('/');
    }
  };

  if (!fbUser) return <Loading visible />;

  return (
    <>
      <div className="bg-rich-black h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl text-white mb-10">Create your profile</h2>
        <div className="grid grid-cols-2 gap-4 justify-between">
          <form className="flex flex-col mr-2 gap-3">
            <label className="text-white">Display Name</label>
            <input
              className="p-2"
              type="text"
              value={displayName}
              size={25}
              onChange={(e) => setDisplayName(e.target.value)}
            />

            <label className="text-white mt-2">Bio</label>
            <input
              className="p-2"
              type="text"
              value={bio}
              size={25}
              onChange={(e) => setBio(e.target.value)}
            />
            <button
              className="flex justify-center items-center p-2 mt-5 bg-powder-blue"
              type="button"
              onClick={handleCreateProfile}
            >
              <span className="text-rich-black text-lg">Create Profile</span>
            </button>
          </form>
          <AvatarSettings image={avatar} setImage={setAvatar} />
        </div>
      </div>
    </>
  );
};

export default Home;
