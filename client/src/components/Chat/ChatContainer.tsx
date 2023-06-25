const ChatContainer = () => {
  return (
    <div className="h-[80vh] w-full relative flex-grow overflow-auto custom-scrollbar">
      <div className="flex w-full">
        <div className="flex flex-col justify-end w-full gap-1 overflow-auto">Message</div>
      </div>
    </div>
  );
};

export default ChatContainer;
