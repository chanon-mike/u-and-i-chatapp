import { Router } from "express";
import { userController } from "./user.controller";

const router: Router = Router();

router.get("/", userController.getUsers);
router.post("/", userController.saveUserProfile);
router.get("/:uid", userController.getCurrentUser);

export default router;
