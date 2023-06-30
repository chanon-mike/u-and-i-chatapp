import { Router } from "express";
import { chatController } from "./chat.controller";

const router: Router = Router();

router.get("/:conversationId", chatController.getAllMessage);
router.post("/:conversationId", chatController.sendMessage);

export default router;
