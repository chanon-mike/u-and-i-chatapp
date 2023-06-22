import dotenv from 'dotenv';

dotenv.config();

const PORT = +(process.env.PORT ?? '8080');
const API_BASE_PATH = process.env.API_BASE_PATH ?? '';
const FIREBASE_SERVER_KEY = process.env.FIREBASE_SERVER_KEY ?? '';
const DATABASE_URL = process.env.DATABASE_URL ?? '';

export { PORT, API_BASE_PATH, FIREBASE_SERVER_KEY, DATABASE_URL };
