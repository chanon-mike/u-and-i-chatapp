import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../utils/prismaClient";

export const chatController = {
  // GET all messages in group
  getAllMessage: async (
    req: Request<{ groupId: number }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const messages = await prismaClient.message.findMany({
        where: {
          groupId: req.params.groupId,
        },
        orderBy: {
          id: "asc",
        },
      });
      return res.status(200).send(messages);
    } catch (e) {
      console.error(e);
      next(e);
    }
  },
  // POST new message from senderUid to groupId
  sendMessage: async (
    req: Request<{ groupId: number }, { message: string; senderUid: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const groupId = req.params.groupId;
      const { message, senderUid } = req.body;

      if (groupId && message && senderUid) {
        const newMessage = await prismaClient.message.create({
          data: {
            message: message,
            group: { connect: { id: groupId } },
            sender: { connect: { uid: senderUid } },
            type: "text",
          },
          include: {
            sender: true,
          },
        });
        return res.status(201).send({ message: newMessage });
      }
      return res
        .status(400)
        .send("groupId, message and senderUid are required.");
    } catch (e) {
      console.error(e);
      next(e);
    }
  },
};
