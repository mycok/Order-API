import config from 'config';
import { Application } from 'express';
import { ExpressConfig } from './Express';
import { logger } from '../../utils/logger';

export class Server {
    server: any;
    express: ExpressConfig;

    constructor() {
        this.express = new ExpressConfig();

        const port = config.get('express.port');

        this.server = this.express.app;
        this.server.listen(port, () => logger.info(
            `------Server Started! Express: http://localhost:${port}------`
        ))
    }

    getServerInstance(): Application {
        return this.server;
    }
}
