import { compare, hash } from "bcrypt";

export class BcryptAdapter {
    static hash = async (plainPassword: string): Promise<string> => {
        const hashedPassword = await hash(plainPassword, 10);
        return hashedPassword;
    };

    static compare = async (password: string, hashed: string): Promise<boolean> => {
        const isMatch = await compare(password, hashed);
        return isMatch;
    };
}
