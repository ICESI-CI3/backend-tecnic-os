import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { Appointment } from './entities/appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechniciansModule } from 'src/technicians/technicians.module';
import { TechniciansService } from 'src/technicians/technicians.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TechniciansModule, UsersModule, TypeOrmModule.forFeature([Appointment])],
  controllers: [AppointmentController],
  providers: [AppointmentService, TechniciansService, UsersService],
  exports: [AppointmentService, TypeOrmModule.forFeature([Appointment])],
})
export class AppointmentModule {}
