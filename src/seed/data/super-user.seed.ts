import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcryptjs from 'bcryptjs';

export const superUserSeed: CreateUserDto[] = [
    {
        id: "123456",
        name: "Administrator",
        email: "admin@example.com",
        password: bcryptjs.hashSync("123456", 10),
        role: ["super-user"]
    }
];