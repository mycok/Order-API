import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { router } from '../routes';

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
        this.app.use(router)
    }

    private clientErrorHandler(err: any, req: Request, res: Response, next: Function): void {
        if (err.hasOwnProperty('thrown')) {
            res.status(err["status"]).send({ error: err.message })
        }
    }
}
