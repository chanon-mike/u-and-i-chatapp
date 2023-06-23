import Image from 'next/image';
import type { Dispatch, SetStateAction } from 'react';

type AvatarProps = {
  type: string;
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
};

const Avatar = ({ type, image }: AvatarProps) => {
  return (
    <>
      <div className="flex items-center justify-center relative">
        {type === 'sm' && (
          <Image className="rounded-full" src={image} width={40} height={40} alt="avatar" />
        )}
        {type === 'lg' && (
          <Image className="rounded-full" src={image} width={64} height={64} alt="avatar" />
        )}
      </div>
    </>
  );
};

export default Avatar;
