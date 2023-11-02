import { CustomError, UserEntity } from "../../domain";

export class UserMapper {
    static userEntityFromObject(object: { [key: string]: any }) {
        const { id, username, email, password } = object;

        if (!id) throw CustomError.badRequest("Missing id");

        if (!username) throw CustomError.badRequest("Missing name");

        if (!email) throw CustomError.badRequest("Missing email");

        if (!password) throw CustomError.badRequest("Missing password");

        return new UserEntity(id.toString(), username, email, password);
    }
}
