import { useEffect, type Dispatch, type SetStateAction } from 'react';

type PhotoUploaderProps = {
  showPhotoUploader: boolean;
  setShowPhotoUploader: Dispatch<SetStateAction<boolean>>;
  setImage: Dispatch<SetStateAction<string>>;
};

const PhotoUploader = ({
  showPhotoUploader,
  setShowPhotoUploader,
  setImage,
}: PhotoUploaderProps) => {
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
    if (showPhotoUploader) {
      const data = document.getElementById('photo-uploader');
      data?.click();
      document.body.onfocus = () => {
        setShowPhotoUploader(false);
      };
    }
  }, [showPhotoUploader, setShowPhotoUploader]);

  return <input type="file" hidden id="photo-uploader" onChange={photoPickerOnChange} />;
};

export default PhotoUploader;
