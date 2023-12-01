import { UserEntity, SigninUserDto, SignupUserDto } from "../";

export abstract class AuthDatasource {
    abstract signin(signinUserDto: SigninUserDto): Promise<UserEntity>;

    abstract signup(signupUserDto: SignupUserDto): Promise<UserEntity>;
}
