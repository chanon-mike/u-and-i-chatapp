import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../utils/prismaClient";

export const messageController = {
  // GET all messages in conversation
  getMessages: async (
    req: Request<{ conversationId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const conversationId = parseInt(req.params.conversationId);
      const messages = await prismaClient.message.findMany({
        where: {
          conversationId: conversationId,
        },
        orderBy: {
          createdAt: "asc",
        },
        include: {
          sender: true,
          messageSeenByUser: true,
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
      { conversationId: string },
      { type: string; message: string; senderUid: string }
    >,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const conversationId = parseInt(req.params.conversationId);
      const { type, message, senderUid } = req.body;

      if (type && message && conversationId && senderUid) {
        const newMessage = await prismaClient.message.create({
          data: {
            type: type,
            message: message,
            conversation: { connect: { id: conversationId } },
            sender: { connect: { uid: senderUid } },
          },
          include: {
            sender: true,
            messageSeenByUser: true,
          },
        });
        return res.status(201).send(newMessage);
      }
      return res
        .status(400)
        .send("type, message, conversationId and senderUid are required.");
    } catch (e) {
      console.error(e);
      next(e);
    }
  },
};
