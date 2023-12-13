import { Request, Response } from "express";
import { logger } from "../../config";
import { AuthRepository, CustomError, SigninUser, SigninUserDto, SignupUser, SignupUserDto } from "../../domain";

export class AuthController {
    constructor(private readonly authRepository: AuthRepository) {}

    private handleError = (err: unknown, res: Response) => {
        if (err instanceof CustomError) {
            return res.status(err.statusCode).json({ error: err.message });
        }
        logger.error(err);
        return res.status(500).json({ err: "Something went wrong!" });
    };

    signupUser = (req: Request, res: Response) => {
        const [err, signupUserDto] = SignupUserDto.create(req.body);
        if (err) return res.status(400).json({ error: err });

        new SignupUser(this.authRepository)
            .execute(signupUserDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };

    signinUser = (req: Request, res: Response) => {
        const [err, signinUserDto] = SigninUserDto.create(req.body);
        if (err) return res.status(400).json({ error: err });

        new SigninUser(this.authRepository)
            .execute(signinUserDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };
}
