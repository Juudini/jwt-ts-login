import { AuthRepository, CustomError, SigninUserDto, JwtAdapter } from "../../";

type SignToken = (payload: object, duration?: string) => Promise<string | null>;

type UserToken = { token: string };

interface SigninUserUseCase {
    execute(signinUserDto: SigninUserDto): Promise<UserToken>;
}

export class SigninUser implements SigninUserUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken
    ) {}

    execute = async (signinUserDto: SigninUserDto): Promise<UserToken> => {
        const user = await this.authRepository.signin(signinUserDto);

        const token = await this.signToken({ id: user.id, username: user.username, email: user.email }, "2h");

        if (!token) throw CustomError.internalServer("Error generating token");

        return { token };
    };
}
