import { apiClient, groupApiBase } from '../utils/apiClient';
import { returnNull } from '../utils/returnNull';

export const groupApiClient = {
  // GET current user available group
  getCurrentUserGroup: async (uid: string) => {
    try {
      return await apiClient
        .get(groupApiBase, {
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
