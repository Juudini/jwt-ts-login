import Express, { Router } from "express";
import cors from "cors";
import morgan from "morgan";

// Winston
import { logger } from "../config";

interface Options {
    port: number;
    routes: Router;
}

export default class Server {
    public readonly app = Express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port = 3100, routes } = options;
        this.port = port;
        this.routes = routes;
    }
    async start() {
        /* ★━━━━━━━━━━━★ Middlewares ★━━━━━━━━━━━★ */
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(Express.json());
        this.app.use(Express.urlencoded({ extended: true }));

        /* ★━━━━━━━━━━━★ Routes ★━━━━━━━━━━━★ */
        this.app.use(this.routes);

        /* ★━━━━━━━━━━━★ Listener ★━━━━━━━━━━━★ */
        this.app.listen(this.port, () => {
            logger.info(`🚀 Server running on port ${this.port}.`);
        });
    }
}
