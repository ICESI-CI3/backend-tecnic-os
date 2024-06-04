import { NotFoundException, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly usersService: UsersService
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto, userId: string): Promise<Appointment> {
    const technician = await this.usersService.findOneByID(createAppointmentDto.technicianId);
    const user = await this.usersService.findOneByID(userId);

    const appointment = new Appointment();
    appointment.user = user;
    appointment.technician = technician;
    appointment.description = createAppointmentDto.description;
    appointment.date = createAppointmentDto.date;
    appointment.initTime = createAppointmentDto.initTime;

    return this.appointmentRepository.save(appointment);
  }

  findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find({ relations: ['user', 'technician'] });
  }

  async findOne(id: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({where: { id: id }});
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return appointment;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    const appointment = await this.findOne(id);
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    appointment.description = updateAppointmentDto.description || appointment.description;
    appointment.date = updateAppointmentDto.date || appointment.date;
    appointment.initTime = updateAppointmentDto.initTime || appointment.initTime;
    appointment.status = updateAppointmentDto.status || appointment.status

    return this.appointmentRepository.save(appointment);
  }

  async remove(id: string): Promise<void> {
    const result = await this.appointmentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
  }

  async fillAppointmentsWithSeedData(appointmentsData: any[]) {
    const createdAppointments = [];
    for (const appointmentData of appointmentsData) {
      try{
        const createdAppointment = await this.create(appointmentData.appointmentDTO, appointmentData.technicianId);
        createdAppointments.push(createdAppointment);
      }catch(error){
        console.error(`Error creating appointment: ${error.message}`);
      }
    }
  }
}

