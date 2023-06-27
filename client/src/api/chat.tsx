import type { ChatModel } from '../interfaces';
import { apiClient, chatApiBase } from '../utils/apiClient';
import { returnNull } from '../utils/returnNull';

// FIX THIS TO GET CHAT AND SEND IN A GROUP
export const chatApiClient = {
  // GET all messages between from and to
  getMessages: async (fromUid: string, toUid: string): Promise<ChatModel[] | null> => {
    try {
      return await apiClient
        .get(chatApiBase, {
          params: {
            fromUid,
            toUid,
          },
        })
        .then((res) => res.data)
        .catch(returnNull);
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  // POST a new message
  sendMessage: async (
    message: string,
    fromUid: string,
    toUid: string
  ): Promise<ChatModel | null> => {
    try {
      return await apiClient
        .post(chatApiBase, {
          message,
          from: fromUid,
          to: toUid,
        })
        .then((res) => res.data)
        .catch(returnNull);
    } catch (e) {
      console.error(e);
      return null;
    }
  },
};
