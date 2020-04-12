import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { router } from '../routes';
import { userRouter } from '../routes/User';
import { orderRouter } from '../routes/Order';

export class ExpressConfig {
    app: express.Express;

    constructor() {
        this.app = express();
        this.middlewareSetup();
        this.routesSetup();
    }

    private middlewareSetup() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(helmet());
        this.app.use(this.clientErrorHandler);
    }

    private routesSetup() {
        this.app.use(router);
        this.app.use(userRouter);
        this.app.use(orderRouter);
    }

    private clientErrorHandler(err: any, req: Request, res: Response, next: Function): void {
        if (err.hasOwnProperty('thrown')) {
            res.status(err["status"]).send({ error: err.message })
        }
    }
}
