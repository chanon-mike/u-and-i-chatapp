import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../utils/prismaClient";

export const chatController = {
  // GET all messages in conversation
  getAllMessage: async (
    req: Request<{ conversationId: number }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const messages = await prismaClient.message.findMany({
        where: {
          conversationId: req.params.conversationId,
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
  // POST new message from senderUid to conversationId
  sendMessage: async (
    req: Request<
      { conversationId: number },
      { message: string; senderUid: string }
    >,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const conversationId = req.params.conversationId;
      const { message, senderUid } = req.body;

      if (conversationId && message && senderUid) {
        const newMessage = await prismaClient.message.create({
          data: {
            message: message,
            conversation: { connect: { id: conversationId } },
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
        .send("conversationId, message and senderUid are required.");
    } catch (e) {
      console.error(e);
      next(e);
    }
  },
};
