import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcryptjs from 'bcryptjs';

export const usersSeed: CreateUserDto[] = [
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
    },
    {
        id: "444444",
        name: "Alice Johnson",
        email: "alice@example.com",
        password: bcryptjs.hashSync("123456", 10),
        role: ["technician"]
    },
    {
        id: "555555",
        name: "Bob Brown",
        email: "bob@example.com",
        password: bcryptjs.hashSync("123456", 10),
        role: ["technician"]
    },
    {
        id: "666666",
        name: "Charlie Black",
        email: "charlie@example.com",
        password: bcryptjs.hashSync("123456", 10),
        role: ["technician"]
    },
    {
        id: "777777",
        name: "Diana White",
        email: "diana@example.com",
        password: bcryptjs.hashSync("123456", 10),
        role: ["technician"]
    },
    {
        id: "888888",
        name: "Evan Green",
        email: "evan@example.com",
        password: bcryptjs.hashSync("123456", 10),
        role: ["technician"]
    },
    {
        id: "999999",
        name: "Fiona Blue",
        email: "fiona@example.com",
        password: bcryptjs.hashSync("123456", 10),
        role: ["technician"]
    },
    {
        id: "101010",
        name: "George Red",
        email: "george@example.com",
        password: bcryptjs.hashSync("123456", 10),
        role: ["technician"]
    },
    {
        id: "121212",
        name: "Hannah Pink",
        email: "hannah@example.com",
        password: bcryptjs.hashSync("123456", 10),
        role: ["technician"]
    },
    {
        id: "131313",
        name: "Ian Gray",
        email: "ian@example.com",
        password: bcryptjs.hashSync("123456", 10),
        role: ["technician"]
    },
    {
        id: "141414",
        name: "Jasmine Orange",
        email: "jasmine@example.com",
        password: bcryptjs.hashSync("123456", 10),
        role: ["technician"]
    },
    {
        id: "151515",
        name: "Kevin Yellow",
        email: "kevin@example.com",
        password: bcryptjs.hashSync("123456", 10),
        role: ["technician"]
    },
    {
        id: "161616",
        name: "Lily Purple",
        email: "lily@example.com",
        password: bcryptjs.hashSync("123456", 10),
        role: ["technician"]
    },
    {
        id: "171717",
        name: "Max Brown",
        email: "max@example.com",
        password: bcryptjs.hashSync("123456", 10),
        role: ["technician"]
    }
        
];
