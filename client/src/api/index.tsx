import axios from 'axios';
import type { UserModel } from '../interfaces';
import { returnNull } from '../utils/returnNull';

const api_base = process.env.NEXT_PUBLIC_API_ENDPOINT;
const userBase = `${api_base}/api/user`;

export const userApiClient = {
  // GET current user data
  getUserData: async (token: string, uid: string): Promise<UserModel | null> => {
    try {
      return await axios
        .get(userBase, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
          params: { uid },
        })
        .then((res) => res.data)
        .catch(returnNull);
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  // POST new user profile to the api
  createUserProfile: async (
    token: string,
    params: {
      uid: string;
      email: string;
      displayName: string;
      bio: string;
      avatar: string;
    }
  ) => {
    try {
      return await axios
        .post(
          userBase,
          {
            uid: params.uid,
            email: params.email,
            displayName: params.displayName,
            bio: params.bio,
            avatar: params.avatar,
          },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => res.data)
        .catch(returnNull);
    } catch (e) {
      console.error(e);
    }
  },
};
