import { Request, Response, Router } from "express";
import { decodeToken } from "../../middlewares/firebaseAdmin";
import { userController } from "./user.controller";

const router: Router = Router();

router.get("/", userController.getUserModel);

export default router;
