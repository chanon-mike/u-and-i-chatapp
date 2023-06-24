import axios from 'axios';
import { returnNull } from '../utils/returnNull';

const api_base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const userBase = `${api_base}/api/user`;

export const getUserData = async (token: string) => {
  try {
    return await axios
      .get(userBase, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data)
      .catch(returnNull);
  } catch (e) {
    console.error(e);
  }
};
