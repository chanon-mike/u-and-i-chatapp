import { useCallback, useRef, type Dispatch, type SetStateAction } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Webcam from 'react-webcam';

type PhotoCaptureProps = {
  showPhotoCapture: boolean;
  setShowPhotoCapture: Dispatch<SetStateAction<boolean>>;
  setImage: Dispatch<SetStateAction<string>>;
};

const PhotoCapture = ({ showPhotoCapture, setShowPhotoCapture, setImage }: PhotoCaptureProps) => {
  const webcamRef = useRef<Webcam>(null);

  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImage(imageSrc);
    }
  }, [webcamRef, setImage]);

  return (
    <>
      {showPhotoCapture && (
        <div className="absolute h-[4/7] w-2/6 top-1/4 left-1/3 bg-gray-800 rounded-lg">
          <div className="flex flex-col items-center justify-center gap-2 pt-5 px-2 w-full">
            <AiOutlineClose
              className="cursor-pointer h-5 w-5"
              color="white"
              onClick={() => setShowPhotoCapture(false)}
            />
            <Webcam
              id="video"
              audio={false}
              width={400}
              height={400}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
            <button
              className="h-16 w-16 bg-white rounded-full mt-2 mb-5 cursor-pointer border-8 border-[#E2D186]"
              onClick={() => {
                capturePhoto();
                setShowPhotoCapture(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoCapture;
