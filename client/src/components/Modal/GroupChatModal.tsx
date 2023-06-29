import type { Dispatch, SetStateAction } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

type GroupChatModalProps = {
  showGroupChatModal: boolean;
  setShowGroupChatModal: Dispatch<SetStateAction<boolean>>;
};

const GroupChatModal = ({ showGroupChatModal, setShowGroupChatModal }: GroupChatModalProps) => {
  return (
    <>
      {showGroupChatModal && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="bg-light-shade rounded-lg p-5 shadow-xl w-2/6 h-1/2">
            <div className="pt-2 pe-2 cursor-pointer flex items-end justify-end">
              <AiOutlineClose
                className="h-10 w-10 text-secondary"
                onClick={() => setShowGroupChatModal(false)}
              />
            </div>
            <span className="text-xl text-primary">Create a group chat</span>
            <p className="text-md text-secondary">Create a chat with more than 2 people</p>

            <form className="flex flex-col mt-10 gap-3">
              <label className="text-primary">Name</label>
              <input className="p-2 bg-searchbar-bg" type="text" size={25} />

              <label className="text-primary mt-2">Members</label>
              <input className="p-2 bg-searchbar-bg" type="text" size={25} />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default GroupChatModal;
