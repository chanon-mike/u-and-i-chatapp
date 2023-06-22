import { CookieOptions, NextFunction, Request, Response } from 'express';
import { prismaClient } from '../services/prismaClient';
import { firebaseAdmin, getUserModel } from '../middlewares/firebaseAdmin';

export type AdditionalRequest = {
  body: { id: string };
};

const options: CookieOptions = {
  httpOnly: true,
  secure: true,
  path: '/',
  sameSite: 'none',
};

export const postSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = firebaseAdmin.auth();
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const id = req.body?.id ?? '';
    const sessionCookie = await auth.createSessionCookie(id, { expiresIn });

    res.cookie('session', sessionCookie, {
      ...options,
      expires: new Date(Date.now() + expiresIn),
    });

    next();

    return res.status(200).json({ status: 'success' });
  } catch (e) {
    next(e);
  }
};
