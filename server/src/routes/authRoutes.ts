import { Router } from 'express';
import { getUser } from '../controllers/authController';
import { postSession } from '../controllers/sessionController';

const authRouter: Router = Router();

authRouter.get('/user', getUser);
authRouter.post('/session', postSession);

export default authRouter;
