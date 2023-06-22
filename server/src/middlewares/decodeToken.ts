import { NextFunction, Request, Response } from 'express';
import { firebaseAdmin } from './firebaseAdmin';

const decodeToken = async (req: Request, res: Response, next: NextFunction) => {
  // Split the token part, e.g.) [‘Bearer ’, ‘eyJhbGciOiJSUzI1NiIsImtpZCI6………..’]
  const token = req.headers.authorization?.split(' ')[1];

  try {
    if (!token) return res.json({ message: 'Unauthorized' });
    const decodeValue = await firebaseAdmin.auth().verifyIdToken(token);
    if (decodeValue) {
      console.log(decodeValue);
      return next();
    }
    return res.json({ message: 'Unauthorized' });
  } catch (e) {
    return res.json({ message: 'Internal error' });
  }
};

export default decodeToken;
