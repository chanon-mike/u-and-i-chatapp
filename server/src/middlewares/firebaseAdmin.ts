import admin from 'firebase-admin';
import { DATABASE_URL, FIREBASE_SERVER_KEY } from '../utils/envValues';
import { NextFunction, Request, Response } from 'express';

export const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(FIREBASE_SERVER_KEY)),
  databaseURL: DATABASE_URL,
});

export const decodeToken = async (req: Request, res: Response, next: NextFunction) => {
  // Split the token part, e.g.) [‘Bearer ’, ‘eyJhbGciOiJSUzI1NiIsImtpZCI6………..’]
  const token = req.headers.authorization?.split(' ')[1];

  try {
    if (!token) return res.json({ message: 'Unauthorized' });
    const decodeValue = await firebaseAdmin.auth().verifyIdToken(token);
    if (decodeValue) {
      res.locals.user = decodeValue;
      return next();
    }
    return res.json({ message: 'Unauthorized' });
  } catch (e) {
    return res.json({ message: 'Internal error' });
  }
};
