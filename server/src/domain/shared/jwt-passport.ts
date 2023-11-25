import { Request } from "express";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { envs } from "../../config";
const JWT_SEED = envs.JWT_SEED;
const jwtPassportInitialize = () => {
    passport.use(
        "jwt",
        new Strategy(
            {
                jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
                secretOrKey: JWT_SEED
            },
            async (jwt_payload, done) => {
                try {
                    return done(null, jwt_payload);
                } catch (err) {
                    done(err);
                }
            }
        )
    );
};

const cookieExtractor = (req: Request) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["MagicianToken"];
    }
    return token;
};

export default jwtPassportInitialize;
