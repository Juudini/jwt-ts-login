import { SignupUserDto, CustomError, AuthRepository, JwtAdapter } from "../../";

type UserToken = { token: string };

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface SignupUserUseCase {
    execute(signupUserDto: SignupUserDto): Promise<UserToken>;
}

export class SignupUser implements SignupUserUseCase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken
    ) {}

    async execute(signupUserDto: SignupUserDto): Promise<UserToken> {
        const user = await this.authRepository.signup(signupUserDto);

        const token = await this.signToken({ id: user.id, email: user.email }, "2h");
        if (!token) throw CustomError.internalServer("Error generating token");

        return { token };
    }
}
