import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../utils/prismaClient";
import { ConversationMember } from "@prisma/client";

type ConversationBody = {
  currentUserId: string;
  name: string;
  userId: string;
  isGroup: boolean;
  members: ConversationMember;
};

export const conversationController = {
  getConversation: async (
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
  getConversations: async (
    req: Request<{}, {}, {}, { uid: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const uid = req.query.uid;
      console.log(req.query);
      if (!uid) return res.status(400).send("uid is required");
      const conversations = await prismaClient.conversation.findMany({
        orderBy: {
          lastMessageAt: "desc",
        },
        where: {
          members: {
            some: {
              userId: uid,
            },
          },
        },
        include: {
          members: true,
          messages: true,
        },
      });
      console.log(conversations);
      return res.status(200).send(conversations);
    } catch (e) {
      console.error(e);
      next(e);
    }
  },
  // create a new conversation if existed, or add new member if not
  createConversation: async (
    req: Request<ConversationBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { currentUserId, userId, isGroup, members, name } = req.body.body;
      if (isGroup && (!members || members.length < 2 || !name)) {
        return res.status(400).send("Invalid data");
      }

      // Create new group chat
      if (isGroup) {
        const newConversation = await prismaClient.conversation.create({
          data: {
            name,
            isGroup,
            members: {
              connect: [
                ...members.map((member: { value: string }) => ({
                  userId: member.value,
                })),
                {
                  userId: currentUserId,
                },
              ],
            },
          },
          include: {
            members: {
              include: {
                user: true,
              },
            },
          },
        });
        return res.status(200).send(newConversation);
      }

      // Check for existing conversation
      const existingConversation = await prismaClient.conversation.findFirst({
        where: {
          AND: [
            {
              members: {
                some: {
                  user: {
                    uid: currentUserId,
                  },
                },
              },
            },
            {
              members: {
                some: {
                  user: {
                    uid: userId,
                  },
                },
              },
            },
          ],
        },
        include: {
          members: {
            include: {
              user: true,
            },
          },
        },
      });
      if (existingConversation) {
        return res.status(200).send(existingConversation);
      }

      // Create new one-to-one conversation
      const newConversation = await prismaClient.conversation.create({
        data: {
          isGroup: false,
          members: {
            createMany: {
              data: [{ userId: currentUserId }, { userId }],
            },
          },
        },
        include: {
          members: {
            include: {
              user: true,
            },
          },
        },
      });
      return res.status(200).send(newConversation);
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
