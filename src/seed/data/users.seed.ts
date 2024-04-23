import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcryptjs from 'bcryptjs';

export const usersSeed: CreateUserDto[] = [
    {
      id: "123456",
      name: "Administrator",
      email: "admin@example.com",
      password: bcryptjs.hashSync("123456", 10),
      role: ["super-user"]
    },
    {
      id: "111111",
      name: "John Doe",
      email: "john@example.com",
      password: bcryptjs.hashSync("123456", 10),
      role: ["user"]
    },
    {
      id: "222222",
      name: "Jane Smith",
      email: "jane@example.com",
      password: bcryptjs.hashSync("123456", 10),
      role: ["technician"]
    },
    {
      id: "333333",
      name: "Mike Morgan",
      email: "mike@example.com",
      password: bcryptjs.hashSync("123456", 10),
      role: ["technician"]
    }
];