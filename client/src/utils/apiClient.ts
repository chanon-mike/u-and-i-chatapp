import axios from 'axios';

const apiBase = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const apiClient = axios.create({ withCredentials: true });

export const userApiBase = `${apiBase}/api/user`;
export const chatApiBase = `${apiBase}/api/chat`;
export const conversationApiBase = `${apiBase}/api/conversation`;
