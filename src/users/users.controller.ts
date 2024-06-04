import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangeRoleDto } from './dto/change-role.dto';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { RoleProtected } from 'src/auth/decorators/role-protected.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOneByID(@Param('id') id: string) {
    return this.usersService.findOneByID(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch('rating/:id')
  updateRating(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateRating(id, updateUserDto);
  }

  @Patch('role/:id')
  updateRole(@Param('id') id: string, @Body() ChangeRoleDto: ChangeRoleDto) {
    console.log('ENTRO HP')
    return this.usersService.updateRole(id, ChangeRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
