import { Router } from "express";
import { groupController } from "./group.controller";

const router: Router = Router();

router.get("/", groupController.getGroup);
router.post("/", groupController.createGroup);
router.post("/:groupId/member", groupController.addGroupMember);

export default router;
