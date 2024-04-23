import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { usersSeed } from "./data/users.seed";

@Injectable()
export class SeedService {
    constructor(
        private readonly usersService: UsersService
    ) {}
    
    async populateDB() {
        this.usersService.fillUsersWithSeedData(usersSeed);
        return 'Database populated';
    }
}