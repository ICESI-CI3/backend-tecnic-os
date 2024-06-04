import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RoleProtected } from 'src/auth/decorators/role-protected.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { UserRoleGuard } from 'src/auth/guard/user-role.guard';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post('create')
  @UseGuards(AuthGuard, UserRoleGuard)
  create(@Body() createAppointmentDto: CreateAppointmentDto, @Request() req) {
    const userId = req.user.id;
    return this.appointmentService.create(createAppointmentDto, userId);
  }

  @Get()
  @UseGuards(AuthGuard, UserRoleGuard)
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard, UserRoleGuard)
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, UserRoleGuard)
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, UserRoleGuard)
  @RoleProtected(ValidRoles.superUser)
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(id);
  }
}
