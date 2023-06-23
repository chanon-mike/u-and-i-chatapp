import dotenv from 'dotenv';

dotenv.config();

const PORT = +(process.env.PORT ?? '8080');
const API_ORIGIN = process.env.API_ORIGIN ?? '';
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? '';
const FIREBASE_SERVER_KEY = process.env.FIREBASE_SERVER_KEY ?? '';
const DATABASE_URL = process.env.DATABASE_URL ?? '';

export { PORT, API_ORIGIN, CORS_ORIGIN, FIREBASE_SERVER_KEY, DATABASE_URL };
