import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../utils/prismaClient";

export const userController = {
  // GET all user data
  getAllUserData: async (req: Request, res: Response) => {
    const allUserPrisma = await prismaClient.user.findMany({
      orderBy: { displayName: "asc" },
    });
    return res.status(200).send(allUserPrisma);
  },
  // GET specific user data
  getUserData: async (req: Request<{ uid: string }>, res: Response) => {
    if (req.params && req.params.uid) {
      const userPrisma = await prismaClient.user.findFirst({
        where: { uid: req.params.uid },
      });
      return res.status(200).send(userPrisma);
    }
    return res.status(400).send("uid is required as a parameter.");
  },
  // POST user profile if not exist, PUT new profile if exist
  saveUserProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body.email || !req.body.displayName) {
        return res.send("Email and display name are required.");
      }

      await prismaClient.user.upsert({
        where: {
          uid: req.body.uid,
        },
        update: {
          displayName: req.body.displayName,
          email: req.body.email,
          bio: req.body.bio,
          avatar: req.body.avatar,
        },
        create: {
          uid: req.body.uid,
          displayName: req.body.displayName,
          email: req.body.email,
          bio: req.body.bio,
          avatar: req.body.avatar,
          isOnline: true,
          createdAt: new Date(Date.now()),
        },
      });
      console.log("New user profile has been created.");
    } catch (e) {
      next(e);
    }
  },
};
