import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../utils/prismaClient";

export const conversationController = {
  getconversation: async (
    req: Request<{}, {}, {}, { uid: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const uid = req.query.uid;
      console.log(req.query);
      if (uid) {
        const conversation = await prismaClient.conversationMember.findMany({
          where: {
            conversation: {
              members: {
                some: {
                  user: {
                    uid,
                  },
                },
              },
            },
            NOT: {
              userId: {
                equals: uid,
              },
            },
          },
          include: {
            conversation: true,
            user: true,
          },
        });
        console.log(conversation);
        return res.status(200).send(conversation);
      }
    } catch (e) {
      console.error(e);
      next(e);
    }
  },
  // create a new conversation if existed, or add new member if not
  createConversation: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const conversation = await prismaClient.conversation.create({
        data: {
          name: "Test",
          isGroup: false,
        },
      });
      return res.status(200).send(conversation);
    } catch (e) {
      console.error(e);
      next(e);
    }
  },
  // Add new conversation member if conversation exist
  // params: conversationId, body: [uid1, uid2, ...]
  addConversationMember: async (
    req: Request<{ conversationId: number }, { userIdList: string[] }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const conversationId = req.params.conversationId;
      const userIdList = req.body.userIdList;
      if (!conversationId && !userIdList) {
        return res
          .status(400)
          .send(
            "conversationId parameter and userIdList as request body is necessary"
          );
      }

      const memberData = userIdList.map((uid: string) => ({
        userId: uid,
        conversationId: conversationId,
      }));
      console.log(memberData);
      const conversationMember =
        await prismaClient.conversationMember.createMany({
          data: memberData,
        });
      return res.status(200).send(conversationMember);
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
};
