import { API_BASE_PATH, PORT } from './envValues';

export const HOST = `${API_BASE_PATH}:${PORT}`;

const AUTH_ROUTE = `${HOST}/api/auth`;

export const GET_USER_ROUTE = `${AUTH_ROUTE}/user`;
export const SESSION_ROUTE = `${AUTH_ROUTE}/session`;
