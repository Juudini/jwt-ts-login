import { logger } from "../../config";
import { AuthDatasource, BcryptAdapter, CustomError, SigninUserDto, SignupUserDto, UserEntity } from "../../domain";
import { UserModel } from "../../data";
import { UserMapper } from "../";

type HashFunction = (password: string) => Promise<string>;
type CompareFunction = (password: string, hashed: string) => Promise<boolean>;

export class AuthDatasourceImpl implements AuthDatasource {
    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
        private readonly userModel = new UserModel()
    ) {}

    signin = async (signinUserDto: SigninUserDto): Promise<UserEntity> => {
        const { email, password } = signinUserDto;
        try {
            //Todo: Arreglar el :any
            const user: any = await this.userModel.findOne(email);

            if (!user) throw CustomError.badRequest("Email not exists");

            const isMatch = await this.comparePassword(password, user[0].password);
            console.log(isMatch, "res?");

            if (!isMatch) throw CustomError.badRequest("Password is not valid");

            const userData = {
                id: user[0].id_user,
                username: user[0].username,
                email,
                password
            };

            return UserMapper.userEntityFromObject(userData);
        } catch (error) {
            logger.error(error);
            throw CustomError.internalServer();
        }
    };

    signup = async (signupUserDto: SignupUserDto): Promise<UserEntity> => {
        const { username, email, password } = signupUserDto;
        try {
            const isEmail = await this.userModel.findEmail(email);

            if (isEmail) throw CustomError.badRequest("Already exists");

            const hashedPassword = await this.hashPassword(password);

            const user = {
                username,
                email,
                password: hashedPassword
            };

            const userData = await this.userModel.create(user);

            return UserMapper.userEntityFromObject(userData);
        } catch (error) {
            logger.error(error);
            throw CustomError.internalServer();
        }
    };
}
