import axios from 'axios';

const api_base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const userBase = `${api_base}/api/users`;

export const getMe = async () => {
  try {
    return await axios
      .get(userBase, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .catch(() => {
        return null;
      });
  } catch (e) {
    console.error(e);
  }
};
