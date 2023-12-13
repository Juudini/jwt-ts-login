import { Validators } from "../../shared/validators";

export class SignInUserDto {
    constructor(
        public email: string,
        public password: string
    ) {}
    static create(object: { [key: string]: any }): [string?, SignInUserDto?] {
        const { email, password } = object;

        if (!email) return ["Missing email"];

        if (!Validators.email.test(email)) return ["Email isn't valid"];

        if (!password) return ["Missing password"];

        return [undefined, new SignInUserDto(email, password)];
    }
}
