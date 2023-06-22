import admin from 'firebase-admin';
import { DATABASE_URL, FIREBASE_SERVER_KEY } from '../utils/envValues';

export const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(FIREBASE_SERVER_KEY)),
  databaseURL: DATABASE_URL,
});

export const getUserModel = async (cookieVal: string | undefined) => {
  const auth = firebaseAdmin.auth();
  const idToken = await auth.verifySessionCookie(cookieVal ?? '', true).catch(() => null);

  return idToken && (await auth.getUser(idToken.uid));
};
