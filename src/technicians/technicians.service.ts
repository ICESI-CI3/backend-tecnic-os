import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technician } from './entities/technician.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TechniciansService {

  constructor(
    @InjectRepository(Technician) 
    private readonly technicianRepository: Repository<Technician>, 
    private readonly userService: UsersService,
    )
  {}

  create(createTechnicianDto: CreateTechnicianDto) {
    const userPromise=this.userService.findOneByID(createTechnicianDto.userId);
    
    userPromise.then((interUser: User) => {
      const technician={
        ...createTechnicianDto, 
        user: interUser
      }
      return this.technicianRepository.save(technician);
    }).catch((error) => {
      //throw new BadRequestException('No user matches with id');
      console.log(error);
    });
  }

  findAll() {
    return `This action returns all technicians`;
  }

  findOneByUserId(userId: string) {
    const userPromise=this.userService.findOneByID(userId);
    
    userPromise.then((user: User) => {
      return this.technicianRepository.findOneBy( {user} ); //aca hacemos esto por la puta asincronia     
    }).catch((error) => {
    });
    return null;
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
