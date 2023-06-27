import { Router } from "express";
import { chatController } from "./chat.controller";

const router: Router = Router();

router.get("/:groupId", chatController.getAllMessage);
router.post("/:groupId", chatController.sendMessage);

export default router;
