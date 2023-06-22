import { NextFunction, Request, Response } from 'express';
import { getUserModel } from '../middlewares/firebaseAdmin';

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getUserModel(req.cookies.session);

    if (!user) {
      res.status(401).send();
      return;
    }

    const userModel = {
      id: user.uid,
      email: user.email ?? '',
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    return res.json(userModel);
  } catch (e) {
    next(e);
  }
};
