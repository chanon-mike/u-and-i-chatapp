import { apiClient, conversationApiBase } from '../utils/apiClient';
import { returnNull } from '../utils/returnNull';

export const conversationApiClient = {
  // GET current user available conversation
  getCurrentUserConversation: async (uid: string) => {
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
};
