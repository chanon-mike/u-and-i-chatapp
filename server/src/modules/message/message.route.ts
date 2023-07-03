import { Router } from "express";
import { messageController } from "./message.controller";

const router: Router = Router();

router.get("/:conversationId", messageController.getMessages);
router.post("/:conversationId", messageController.sendMessage);

export default router;
