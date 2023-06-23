import Image from 'next/image';
import type { Dispatch, SetStateAction } from 'react';
import React, { useEffect, useState } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import type { ContextMenuCordinates } from '../../interfaces';
import ContextMenu from './ContextMenu';

type AvatarSettingsProps = {
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
};

const AvatarSettings = ({ image, setImage }: AvatarSettingsProps) => {
  const [hover, setHover] = useState<boolean>(false);
  // State to show options for choosing avatar, cordinates for made it appear at clicked location
  const [isContextMenuVisible, setIsContextMenuVisible] = useState<boolean>(false);
  const [contextMenuCordinates, setContextMenuCordinates] = useState<ContextMenuCordinates>({
    x: 0,
    y: 0,
  });

  // State indicating show photo uploading, photo library, take photo
  const [getPhoto, setGetPhoto] = useState<boolean>(false);
  const [showPhotoLibrary, setShowPhotoLibrary] = useState<boolean>(false);

  // Show options context menu at current click location
  const showContextMenu = (
    e: React.MouseEvent<HTMLDivElement | SVGElement | HTMLSpanElement, MouseEvent>
  ) => {
    e.preventDefault();
    setContextMenuCordinates({ x: e.pageX, y: e.pageY });
    setIsContextMenuVisible(true);
  };

  // Options to do when selecting avatar
  const contextMenuOptions = [
    { name: 'Take Photo', callback: () => setImage('/avatar/avatar_default.png') },
    { name: 'Choose from library', callback: () => setShowPhotoLibrary(true) },
    { name: 'Upload Photo', callback: () => setGetPhoto(true) },
    { name: 'Remove Photo', callback: () => setImage('/avatar/avatar_default.png') },
  ];

  // Get and upload photo
  const photoPickerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      console.log(file);
      const imageUrl = URL.createObjectURL(file[0]);
      setImage(imageUrl);
    }
  };

  // Select file by manipulate DOM to click on type=file hidden form when click upload photo
  useEffect(() => {
    if (getPhoto) {
      const data = document.getElementById('photo-picker');
      data?.click();
      document.body.onfocus = () => {
        setGetPhoto(false);
      };
    }
  }, [getPhoto]);

  return (
    <>
      <div className="flex items-center justify-center relative">
        <div
          className="relative cursor-pointer z-0"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {/* ContextMenu hover elements */}
          {hover && (
            <div
              className=" hover:backdrop-brightness-50  h-60 w-60 flex absolute flex-col item-center justify-center rounded-full z-10"
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
            {/* Load image until image variable available */}
            {image && (
              <Image
                className="rounded-full"
                src={image}
                width={240}
                height={240}
                alt="avatar"
                priority
              />
            )}
          </div>
        </div>
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
      {/* Image uploading component */}
      <div id="photo-picker-element">
        <input type="file" hidden id="photo-picker" onChange={photoPickerOnChange} />
      </div>
    </>
  );
};

export default AvatarSettings;
