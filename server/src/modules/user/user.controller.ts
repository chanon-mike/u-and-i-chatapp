import { Request, Response } from "express";

export const userController = {
  getUserModel: (req: Request, res: Response) => {
    // console.log(res.locals.user);
    return res.status(200).send(res.locals.user);
  },
};
