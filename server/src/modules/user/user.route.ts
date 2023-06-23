import { Request, Response, Router } from 'express';
import { decodeToken } from '../../middlewares/firebaseAdmin';

const router: Router = Router();

router.get('/', decodeToken, (req: Request, res: Response) => {
  console.log(res.locals.user);
  return res.send(res.locals.user);
});

export default router;
