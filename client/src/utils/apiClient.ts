import axios from 'axios';

const apiBase = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const apiClient = axios.create({ withCredentials: true });

export const userApiBase = `${apiBase}/api/user`;
export const messageApiBase = `${apiBase}/api/message`;
export const conversationApiBase = `${apiBase}/api/conversation`;
