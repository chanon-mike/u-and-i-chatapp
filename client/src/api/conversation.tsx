import type { ConversationMemberModel } from '../interfaces';
import { apiClient, conversationApiBase } from '../utils/apiClient';
import { returnNull } from '../utils/returnNull';

type conversationBody = {
  currentUserId: string;
  userId: string;
  name?: string;
  isGroup: boolean;
  members?: ConversationMemberModel;
};

export const conversationApiClient = {
  // GET current user available conversation
  getConversations: async (uid: string) => {
    try {
      return await apiClient
        .get(conversationApiBase, {
          params: {
            uid,
          },
        })
        .then((res) => res.data)
        .catch(returnNull);
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  postConversation: async (body: conversationBody) => {
    try {
      return await apiClient
        .post(conversationApiBase, {
          body,
        })
        .then((res) => res.data)
        .catch(returnNull);
    } catch (e) {
      console.error(e);
      return null;
    }
  },
};
