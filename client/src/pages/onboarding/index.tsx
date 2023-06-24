import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { userAtom } from '../../atom/user';

import AvatarSettings from '../../components/common/AvatarSettings';
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

  // Validate user info
  const validateDetail = () => {
    return displayName.length > 3;
  };

  // Create user profile
  const handleCreateProfile = async () => {
    if (validateDetail()) {
      const email = user?.email;

      console.log('Creating profile', { email, displayName, bio, avatar });
    }
  };

  if (!user) return <Loading visible />;

  return (
    <>
      <div className="bg-rich-black h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl text-white mb-10">Create your profile</h2>
        <div className="grid grid-cols-2 gap-4 justify-between">
          <form className="flex flex-col mr-2 gap-3">
            <label className="text-white">Display Name </label>
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
