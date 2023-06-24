import Image from 'next/image';
import type { Dispatch, SetStateAction } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

type AvatarLibraryProps = {
  showAvatarLibrary: boolean;
  setShowAvatarLibrary: Dispatch<SetStateAction<boolean>>;
  setImage: Dispatch<SetStateAction<string>>;
};

const AvatarLibrary = ({
  showAvatarLibrary,
  setShowAvatarLibrary,
  setImage,
}: AvatarLibraryProps) => {
  const avatarList = [
    '/avatars/avatar1.png',
    '/avatars/avatar2.png',
    '/avatars/avatar3.png',
    '/avatars/avatar4.png',
    '/avatars/avatar5.png',
    '/avatars/avatar6.png',
    '/avatars/avatar7.png',
    '/avatars/avatar8.png',
    '/avatars/avatar9.png',
  ];

  return (
    <>
      {showAvatarLibrary && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="bg-slate-700 rounded-lg p-2">
            <div className="pt-2 pe-2 cursor-pointer flex items-end justify-end">
              <AiOutlineClose
                className="h-10 w-10"
                color="white"
                onClick={() => setShowAvatarLibrary(false)}
              />
            </div>

            <div className="grid grid-cols-3 justify-centeri items-center gap-10 p-6">
              {avatarList.map((avatar) => (
                <div
                  className="cursor-pointer"
                  key={avatar}
                  onClick={() => {
                    setImage(avatar);
                    setShowAvatarLibrary(false);
                  }}
                >
                  <Image
                    className="rounded-full w-32 aspect-square"
                    src={avatar}
                    width={0}
                    height={0}
                    sizes="auto"
                    alt="avatar_sample"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AvatarLibrary;
