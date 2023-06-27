import { Router } from "express";
import { userController } from "./user.controller";

const router: Router = Router();

router.get("/", userController.getAllUserData);
router.post("/", userController.saveUserProfile);
router.get("/:uid", userController.getUserData);

export default router;
