import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcryptjs from 'bcryptjs';

export const usersSeed: CreateUserDto[] = [
    {
        id: "123456789",
        name: "John Doe",
        email: "john@example.com",
        password: bcryptjs.hashSync("12345678", 10),
        role: ["user"]
      },
      {
        id: "987654321",
        name: "Jane Smith",
        email: "jane@example.com",
        password: bcryptjs.hashSync("12345678", 10),
        role: ["technician"]
      }
];