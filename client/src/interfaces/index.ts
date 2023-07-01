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
export interface UserModel {
  uid: string;
  displayName: string;
  email: string;
  bio: string;
  avatar: string;
  isOnline: boolean;
  createdAt: number;
}

export interface ChatModel {
  id: number;
  senderUid: UserModel['uid'];
  receiverUid: UserModel['uid'];
  type: string;
  message: string;
  messageStatus: string;
  createdAt: number;
}

export interface ConversationModel {
  id: number;
  name: string;
  isGroup: boolean;
  lastMessageAt: number;
  createdAt: number;
}

export interface ConversationMemberModel {
  id: number;
  userId: UserModel['uid'];
  conversationId: ConversationModel['id'];
}

export interface ConversationMemberWithUserModel extends ConversationMemberModel {
  user: UserModel;
}

export interface FullConversationModel extends ConversationModel {
  members: ConversationMemberWithUserModel[];
}
