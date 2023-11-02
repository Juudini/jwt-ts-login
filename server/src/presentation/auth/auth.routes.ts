import { Router } from "express";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthController } from "./auth.controller";

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();
        const datasource = new AuthDatasourceImpl();
        const authRepository = new AuthRepositoryImpl(datasource);

        const controller = new AuthController(authRepository);

        router.post("/signup", controller.signupUser);
        router.post("/signin", controller.signinUser);

        return router;
    }
}
