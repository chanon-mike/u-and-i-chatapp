import type { FullMessageModel, MessageModel } from '../interfaces';
import { apiClient, messageApiBase } from '../utils/apiClient';
import { returnNull } from '../utils/returnNull';

// FIX THIS TO GET CHAT AND SEND IN A GROUP
export const messageApiClient = {
  // GET all messages between from and to
  getMessages: async (conversationId: number): Promise<FullMessageModel[] | null> => {
    try {
      return await apiClient
        .get(`${messageApiBase}/${conversationId}`)
        .then((res) => res.data)
        .catch(returnNull);
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  // POST a new message
  sendMessage: async (
    conversationId: number,
    body: {
      type: string;
      message: string;
      senderUid: string;
    }
  ): Promise<MessageModel | null> => {
    try {
      return await apiClient
        .post(`${messageApiBase}/${conversationId}`, {
          ...body,
        })
        .then((res) => res.data)
        .catch(returnNull);
    } catch (e) {
      console.error(e);
      return null;
    }
  },
};
