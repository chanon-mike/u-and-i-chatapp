import { Router } from "express";
import { chatController } from "./chat.controller";

const router: Router = Router();

router.get("/", chatController.getMessages);
router.post("/", chatController.sendMessage);

export default router;
