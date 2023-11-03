import { logger } from "../../../config";
import { SignupUserDto, CustomError } from "../../../domain";
import connection from "../mysql-database";

interface UserData {
    id: string;
    username: string;
    email: string;
}

export class UserModel {
    private readonly connection;

    constructor() {
        this.connection = connection;
    }

    create = async (signupUserDto: SignupUserDto): Promise<UserData> => {
        const { username, email, password } = signupUserDto;
        try {
            const query = "INSERT INTO user (username, email, password) VALUES (?, ?, ?)";

            const [resQuery]: any = await this.connection.query(query, [username, email, password]);

            const userData = {
                id: resQuery.insertId,
                username,
                email,
                password
            };

            return userData;
        } catch (err) {
            logger.error(err);
            throw CustomError.internalServer();
        }
    };

    findOne = async (email: string): Promise<SignupUserDto | {}> => {
        try {
            const query = "SELECT id_user,username,password FROM user WHERE email = ?";

            const [result] = await this.connection.query(query, [email]);

            return result;
        } catch (err) {
            logger.error(err);
            throw CustomError.internalServer();
        }
    };

    findEmail = async (email: string): Promise<boolean> => {
        try {
            const query = "SELECT email FROM user WHERE email = ?";

            const [result] = await this.connection.query(query, [email]);

            return Array.isArray(result) && result.length > 0;
        } catch (err) {
            logger.error(err);
            throw CustomError.internalServer();
        }
    };
}
