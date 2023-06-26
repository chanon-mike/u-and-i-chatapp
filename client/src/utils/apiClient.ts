import axios from 'axios';

const apiBase = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const apiClient = axios.create({ withCredentials: true });

export const userApi = `${apiBase}/api/user`;
export const chatApi = `${apiBase}/api/chat`;
