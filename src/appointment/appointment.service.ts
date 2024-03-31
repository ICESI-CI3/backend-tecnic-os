import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TechniciansService } from 'src/technicians/technicians.service';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment) 
    private readonly appointmentRepository: Repository<Appointment>, 
    private readonly techniciansService: TechniciansService
    )
  {}
  create(createAppointmentDto: CreateAppointmentDto, techId: string) {
    const technician = this.techniciansService.findOneByUserId(techId);
    if(technician){
      const appointment={
        ...createAppointmentDto, 
        technicianId: techId
      }
      return this.appointmentRepository.save(appointment)
    } 

    throw new BadRequestException('User already exists');
  }

  findAll() {
    return `This action returns all appointment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
