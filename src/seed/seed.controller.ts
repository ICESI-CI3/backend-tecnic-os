import {Controller, Get} from '@nestjs/common';
import { SeedService } from './seed.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RoleProtected } from 'src/auth/decorators/role-protected.decorator';
import { UserRoleGuard } from 'src/auth/guard/user-role.guard';
import { UseGuards } from '@nestjs/common';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';

@Controller('seed')
export class SeedController {
    constructor(private readonly seedService: SeedService) {}

    @Get()
    @UseGuards(AuthGuard, UserRoleGuard)
    @RoleProtected(ValidRoles.technician, ValidRoles.superUser)
    runSeed(){
        return this.seedService.populateDB();
    }
}