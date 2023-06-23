import Image from 'next/image';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import type { ContextMenuCordinates } from '../../interfaces';
import ContextMenu from './ContextMenu';

type AvatarProps = {
  type: string;
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
};

const Avatar = ({ type, image, setImage }: AvatarProps) => {
  const [hover, setHover] = useState<boolean>(false);
  // State to show options for choosing avatar, cordinates for made it appear at clicked location
  const [isContextMenuVisible, setIsContextMenuVisible] = useState<boolean>(false);
  const [contextMenuCordinates, setContextMenuCordinates] = useState<ContextMenuCordinates>({
    x: 0,
    y: 0,
  });

  const showContextMenu = (
    e: React.MouseEvent<HTMLDivElement | SVGElement | HTMLSpanElement, MouseEvent>
  ) => {
    // Set cordinates to current click location
    e.preventDefault();
    setContextMenuCordinates({ x: e.pageX, y: e.pageY });
    setIsContextMenuVisible(true);
  };

  // Options to do when selecting avatar
  const contextMenuOptions = [
    { name: 'Take Photo', callback: () => null },
    { name: 'Choose from library', callback: () => null },
    { name: 'Upload Photo', callback: () => null },
    { name: 'Remove Photo', callback: () => null },
  ];

  return (
    <>
      <div className="flex items-center justify-center relative">
        {type === 'sm' && (
          <Image className="rounded-full" src={image} width={40} height={40} alt="avatar" />
        )}
        {type === 'xl' && (
          <div
            className="relative cursor-pointer z-0"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {hover && (
              <div
                className="backdrop-brightness-50  h-60 w-60 flex absolute flex-col item-center justify-center rounded-full z-10"
                onClick={(e) => showContextMenu(e)}
                id="context-opener"
              >
                <AiFillCamera
                  color="#fff"
                  className="text-2xl absolute top-1/3 left-2/4 transform -translate-x-1/2 -translate-y-1/2"
                  onClick={(e) => showContextMenu(e)}
                />
                <span
                  className="text-white flex justify-center item-center text-center mt-5"
                  id="context-opener"
                  onClick={(e) => showContextMenu(e)}
                >
                  Change <br />
                  Profile <br />
                  Photo
                </span>
              </div>
            )}
            <div className="flex justify-center item-center">
              <Image className="rounded-full" src={image} width={240} height={240} alt="avatar" />
            </div>
          </div>
        )}
      </div>
      {/* Show the options available here */}
      {isContextMenuVisible && (
        <ContextMenu
          options={contextMenuOptions}
          cordinates={contextMenuCordinates}
          contextMenu={isContextMenuVisible}
          setContextMenu={setIsContextMenuVisible}
        />
      )}
    </>
  );
};

export default Avatar;
