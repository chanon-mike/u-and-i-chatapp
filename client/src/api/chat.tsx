import type { ChatModel } from '../interfaces';
import { apiClient, chatApi } from '../utils/apiClient';
import { returnNull } from '../utils/returnNull';

export const chatApiClient = {
  // GET all messages between from and to
  getMessages: async (fromUid: string, toUid: string): Promise<ChatModel[] | null> => {
    try {
      return await apiClient
        .get(chatApi, {
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
        .post(chatApi, {
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
