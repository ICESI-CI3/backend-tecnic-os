import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { Appointment } from './entities/appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechniciansModule } from 'src/technicians/technicians.module';
import { TechniciansService } from 'src/technicians/technicians.service';

@Module({
  imports: [TechniciansModule, TypeOrmModule.forFeature([Appointment])],
  controllers: [AppointmentController],
  providers: [AppointmentService, TechniciansService],
})
export class AppointmentModule {}
