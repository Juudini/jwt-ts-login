import { Validators } from "../../";

export class SignupUserDto {
    constructor(
        public username: string,
        public email: string,
        public password: string
    ) {}
    static create(object: { [key: string]: any }): [string?, SignupUserDto?] {
        const { username, email, password } = object;

        if (!username) return ["Missing name"];

        if (!email) return ["Missing email"];

        if (!Validators.email.test(email)) return ["Email is not valid"];

        if (!password) return ["Missing password"];

        if (password.length < 6) return ["Password too short"];

        if (!Validators.password.test(password)) return ["Password is not valid"];

        return [undefined, new SignupUserDto(username, email, password)];
    }
}
