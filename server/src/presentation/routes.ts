import { Request, Response, Router } from "express";

export class AppRouters {
    static get() {
        const router = Router();

        router.use("/ping", (_req: Request, res: Response) => {
            res.json({ message: "pong" });
        });

        return router;
    }
}
