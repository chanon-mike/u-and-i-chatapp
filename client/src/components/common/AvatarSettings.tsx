import Image from 'next/image';
import type { Dispatch, SetStateAction } from 'react';
import React, { useState } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import type { ContextMenuCordinates } from '../../interfaces';
import AvatarLibrary from './AvatarLibrary';
import ContextMenu from './ContextMenu';
import PhotoCapture from './PhotoCapture';
import PhotoUploader from './PhotoUploader';

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
  // State indicating show photo uploading, avatar library, take photo
  const [showPhotoCapture, setshowPhotoCapture] = useState<boolean>(false);
  const [showAvatarLibrary, setShowAvatarLibrary] = useState<boolean>(false);
  const [showPhotoUploader, setShowPhotoUploader] = useState<boolean>(false);

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
    { name: 'Take Photo', callback: () => setshowPhotoCapture(true) },
    { name: 'Choose from library', callback: () => setShowAvatarLibrary(true) },
    { name: 'Upload Photo', callback: () => setShowPhotoUploader(true) },
    { name: 'Remove Photo', callback: () => setImage('/avatars/avatar_default.png') },
  ];

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
              className="backdrop-brightness-50 w-60 h-auto max-w-full aspect-square flex absolute flex-col items-center justify-center rounded-full z-10"
              onClick={(e) => showContextMenu(e)}
              id="context-opener"
            >
              <AiFillCamera
                color="#fff"
                className="text-2xl absolute top-1/3 left-2/4 transform -translate-x-1/2 -translate-y-1/2"
                onClick={(e) => showContextMenu(e)}
              />
              <span
                className="text-white text-center mt-10 text-base"
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
                className="rounded-full w-60 aspect-square"
                src={image}
                width={0}
                height={0}
                sizes="auto"
                alt="avatar"
                priority
              />
            )}
          </div>
        </div>
      </div>
      {/* Show the options available here */}
      <ContextMenu
        options={contextMenuOptions}
        cordinates={contextMenuCordinates}
        visible={isContextMenuVisible}
        setContextMenu={setIsContextMenuVisible}
      />
      {/* Take photo component */}
      <PhotoCapture
        showPhotoCapture={showPhotoCapture}
        setShowPhotoCapture={setshowPhotoCapture}
        setImage={setImage}
      />
      {/* Image uploading element */}
      <PhotoUploader
        showPhotoUploader={showPhotoUploader}
        setShowPhotoUploader={setShowPhotoUploader}
        setImage={setImage}
      />
      {/* Avatar selector component */}
      <AvatarLibrary
        showAvatarLibrary={showAvatarLibrary}
        setShowAvatarLibrary={setShowAvatarLibrary}
        setImage={setImage}
      />
    </>
  );
};

export default AvatarSettings;
