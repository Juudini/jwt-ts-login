import { Router } from "express";
import { AuthRoutes } from "./auth/auth.routes";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use("/api/sessions", AuthRoutes.routes);

        return router;
    }
}
