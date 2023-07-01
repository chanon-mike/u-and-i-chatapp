import { Router } from "express";
import { conversationController } from "./conversation.controller";

const router: Router = Router();

router.get("/", conversationController.getConversations);
router.post("/", conversationController.createConversation);
router.post(
  "/:conversationId/member",
  conversationController.addConversationMember
);

export default router;
