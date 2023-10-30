import { Validators } from "../../shared/validators";

export class SignUpUserDto {
    constructor(
        public username: string,
        public email: string,
        public password: string
    ) {}
    static create(object: { [key: string]: any }): [string?, SignUpUserDto?] {
        const { username, email, password } = object;

        if (!username) return ["Missing name"];

        if (!email) return ["Missing email"];

        if (!Validators.email.test(email)) return ["Email is not valid"];

        if (!password) return ["Missing password"];

        if (password.length < 6) return ["Password too short"];

        return [undefined, new SignUpUserDto(username, email, password)];
    }
}
