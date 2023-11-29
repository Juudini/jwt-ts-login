import { logger } from "../../../config";
import { SignupUserDto, CustomError } from "../../../domain";
import { PrismaClient } from "@prisma/client";
import { UserData } from "../../../domain";

export class UserModel {
    private readonly prisma;

    constructor() {
        this.prisma = new PrismaClient();
    }

    create = async (signupUserDto: SignupUserDto): Promise<UserData> => {
        const { username, email, password } = signupUserDto;
        try {
            const createdUser: UserData = await this.prisma.user.create({
                data: { email, password, username },
                select: { id: true, username: true, email: true, password: true }
            });

            const userData: UserData = {
                id: createdUser.id,
                username: createdUser.username,
                email: createdUser.email,
                password: createdUser.password
            };

            return userData;
        } catch (err) {
            logger.error(err);
            throw CustomError.internalServer();
        }
    };

    findOneByEmail = async (email: string): Promise<UserData> => {
        try {
            const result: UserData | null = await this.prisma.user.findUnique({ where: { email: email } });

            return result as UserData;
        } catch (err) {
            logger.error(err);
            throw CustomError.internalServer();
        }
    };

    findEmail = async (email: string): Promise<boolean> => {
        try {
            const result: number = await this.prisma.user.count({ where: { email } });

            return result > 0;
        } catch (err) {
            logger.error(err);
            throw CustomError.internalServer();
        }
    };
}
