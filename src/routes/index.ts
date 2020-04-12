import { Request, Response, Router } from 'express';

export const router: Router = Router();

router.route('/')
.get((req: Request, res: Response) => {
            res.status(200).send({ status: 'success' });
});
