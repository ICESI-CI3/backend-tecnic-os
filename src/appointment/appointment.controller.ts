import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { TechniciansService } from 'src/technicians/technicians.service';
import { Appointment } from './entities/appointment.entity';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RoleProtected } from 'src/auth/decorators/role-protected.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { UserRoleGuard } from 'src/auth/guard/user-role.guard';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post('create')
  @UseGuards(AuthGuard, UserRoleGuard)
  @RoleProtected(ValidRoles.technician)
  create(@Body() createAppointmentDto: CreateAppointmentDto, @Request() req) {
    const technicianId= req.user.id;
    console.log("texto: ", technicianId);
    return {
      ok: true,
      message:  "Works"
    }
    //return this.appointmentService.create(createAppointmentDto, technicianId);
  }

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }
}