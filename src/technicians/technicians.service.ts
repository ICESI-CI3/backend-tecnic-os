import { Injectable } from '@nestjs/common';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technician } from './entities/technician.entity';

@Injectable()
export class TechniciansService {

  constructor(
    @InjectRepository(Technician) 
    private readonly technicianRepository: Repository<Technician>
    )
  {}

  create(createTechnicianDto: CreateTechnicianDto) {
    return this.technicianRepository.save(createTechnicianDto);
  }

  findAll() {
    return `This action returns all technicians`;
  }

  findOneByUserId(userId: string) {
    return this.technicianRepository.findOneBy({ userId });
  }

  findOne(id: number) {
    return `This action returns a #${id} technician`;
  }

  update(id: number, updateTechnicianDto: UpdateTechnicianDto) {
    return `This action updates a #${id} technician`;
  }

  remove(id: number) {
    return `This action removes a #${id} technician`;
  }
}
