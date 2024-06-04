import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { TechniciansService } from './technicians.service';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RoleProtected } from 'src/auth/decorators/role-protected.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';

@Controller('technicians')
export class TechniciansController {
  constructor(private readonly techniciansService: TechniciansService) {}

  @Post('register')
  create(@Body() createTechnicianDto: CreateTechnicianDto) {
    return this.techniciansService.create(createTechnicianDto);
  }

  @Get()
  findAll() {
    return this.techniciansService.findAll();
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.techniciansService.findOneByUserId(userId);
  }
  
  @Get('user/:id')
  findUserByTechnicianId(@Param('id') id: string) {
    return this.techniciansService.findUserByTechnicianId(id);
  }



  @Patch(':userId')
  update(
    @Param('userId') userId: string,
    @Body() updateTechnicianDto: UpdateTechnicianDto,
  ) {
    console.log("PRUEBA 10000000:", userId)
    return this.techniciansService.update(userId, updateTechnicianDto);
  }

  
  @RoleProtected(ValidRoles.technician)
  @RoleProtected(ValidRoles.superUser)
  @Delete(':id') //este metodo es para el id de tecnico, no el id de usuario
  remove(@Param('id') userId: string) {
    return this.techniciansService.remove(userId);
  }
}
