import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { error } from 'console';


@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment) 
    private readonly appointmentRepository: Repository<Appointment>, 
    private readonly usersService: UsersService
    )
  {}
  create(createAppointmentDto: CreateAppointmentDto, technicianId: string) {
    const userPromise=this.usersService.findOneByID(createAppointmentDto.userId);
    const technicianPromise=this.usersService.findOneByID(technicianId);
    userPromise.then((interUser: User) => {
      technicianPromise.then((interTechnician: User) => {
        const appointment={
          ...createAppointmentDto, 
          user: interUser, 
          technician: interTechnician
        }
        return this.appointmentRepository.save(appointment);
      }).catch((error) => { });
    }).catch((error) => {
      console.log(error);
    });
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
