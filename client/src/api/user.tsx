import type { UserModel } from '../interfaces';
import { apiClient, userApiBase } from '../utils/apiClient';
import { returnNull } from '../utils/returnNull';

export const userApiClient = {
  // GET current user data
  getUserData: async (uid: string): Promise<UserModel | null> => {
    try {
      return await apiClient
        .get(`${userApiBase}/${uid}`)
        .then((res) => res.data)
        .catch(returnNull);
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  // GET all user data
  getAllUserData: async (): Promise<UserModel[] | null> => {
    try {
      return await apiClient
        .get(userApiBase)
        .then((res) => res.data)
        .catch(returnNull);
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  // POST new user profile to the api
  createUserProfile: async (params: {
    uid: string;
    email: string;
    displayName: string;
    bio: string;
    avatar: string;
  }) => {
    try {
      return await apiClient
        .post(userApiBase, {
          uid: params.uid,
          email: params.email,
          displayName: params.displayName,
          bio: params.bio,
          avatar: params.avatar,
        })
        .then((res) => res.data)
        .catch(returnNull);
    } catch (e) {
      console.error(e);
    }
  },
};
