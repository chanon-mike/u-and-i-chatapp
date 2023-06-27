// Type for options available when selecting avatar
export type ContextMenuOption = {
  name: string;
  callback: () => void;
};

export type ContextMenuCordinates = {
  x: number;
  y: number;
};

// Type for model
export type UserModel = {
  uid: string;
  displayName: string;
  email: string;
  bio: string;
  avatar: string;
  isOnline: boolean;
  createdAt: number;
};

export type ChatModel = {
  id: number;
  senderUid: UserModel['uid'];
  receiverUid: UserModel['uid'];
  type: string;
  message: string;
  messageStatus: string;
  createdAt: number;
};
