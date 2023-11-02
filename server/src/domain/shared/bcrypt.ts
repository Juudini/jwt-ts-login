import { compareSync, hashSync } from "bcrypt";

export class BcryptAdapter {
    static hash(plainPassword: string): string {
        return hashSync(plainPassword, 10);
    }

    static compare(password: string, hashed: string): boolean {
        return compareSync(password, hashed);
    }
}
