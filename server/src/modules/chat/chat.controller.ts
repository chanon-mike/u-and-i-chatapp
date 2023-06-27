import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../utils/prismaClient";

export const chatController = {
  // GET all messages between fromUid to toUid
  getMessages: async (
    req: Request<{}, {}, {}, { fromUid: string; toUid: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { fromUid, toUid } = req.query;
      const messages = await prismaClient.message.findMany({
        where: {
          OR: [
            {
              senderUid: fromUid,
              receiverUid: toUid,
            },
            {
              senderUid: toUid,
              receiverUid: fromUid,
            },
          ],
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
  // POST new message fromUid to toUid
  sendMessage: async (
    req: Request<{ message: string; fromUid: string; toUid: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { message, fromUid, toUid } = req.body;
      const isReceiverOnline = global.onlineUsers.get(toUid);
      console.log(isReceiverOnline);
      if (message && fromUid && toUid) {
        const newMessage = await prismaClient.message.create({
          data: {
            message: message,
            sender: { connect: { uid: fromUid } },
            receiver: { connect: { uid: toUid } },
            messageStatus: isReceiverOnline ? "delivered" : "sent",
          },
          include: {
            sender: true,
            receiver: true,
          },
        });
        return res.status(201).send({ message: newMessage });
      }
      return res.status(400).send("message, from, to are required.");
    } catch (e) {
      console.error(e);
      next(e);
    }
  },
};
