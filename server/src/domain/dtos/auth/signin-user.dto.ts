import { Validators } from "../../";

export class SigninUserDto {
    constructor(
        public email: string,
        public password: string
    ) {}
    static create(object: { [key: string]: any }): [string?, SigninUserDto?] {
        const { email, password } = object;

        if (!email) return ["Missing email"];

        if (!Validators.email.test(email)) return ["Email isn't valid"];

        if (!password) return ["Missing password"];

        return [undefined, new SigninUserDto(email, password)];
    }
}
