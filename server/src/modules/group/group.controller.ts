import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../utils/prismaClient";

export const groupController = {
  getGroup: async (
    req: Request<{}, {}, {}, { uid: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const uid = req.query.uid;
      console.log(req.query);
      if (uid) {
        const group = await prismaClient.groupMember.findMany({
          where: {
            group: {
              members: {
                some: {
                  user: {
                    uid,
                  },
                },
              },
            },
          },
          include: {
            group: true,
            user: true,
          },
          // where: {
          //   members: {
          //     some: {
          //       userId: {
          //         equals: uid,
          //       },
          //     },
          //   },
          // },
          // include: {
          //   members: true,
          // },
        });
        console.log(group);
        return res.status(200).send(group);
      }
    } catch (e) {
      console.error(e);
      next(e);
    }
  },
  // create a new group if existed, or add new member if not
  createGroup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const group = await prismaClient.group.create({
        data: {
          name: "Test",
        },
      });
      return res.status(200).send(group);
    } catch (e) {
      console.error(e);
      next(e);
    }
  },
  // Add new group member if group exist
  // params: groupId, body: [uid1, uid2, ...]
  addGroupMember: async (
    req: Request<{ groupId: number }, { userIdList: string[] }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const groupId = req.params.groupId;
      const userIdList = req.body.userIdList;
      if (!groupId && !userIdList) {
        return res
          .status(400)
          .send(
            "groupId parameter and userIdList as request body is necessary"
          );
      }

      const memberData = userIdList.map((uid: string) => ({
        userId: uid,
        groupId: groupId,
      }));
      console.log(memberData);
      const groupMember = await prismaClient.groupMember.createMany({
        data: memberData,
      });
      return res.status(200).send(groupMember);
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
};
