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
    return this.technicianRepository.find();
  }

  async findOneByUserId(userId: string): Promise<Technician | null> {
    try {
      // Get the user asynchronously
      const user = await this.userService.findOneByID(userId);
      if (!user) {
        console.log(`User with ID ${userId} not found`);
        return null; // Handle when user not found
      }

      // Get the technician asynchronously based on the user
      const technician = await this.technicianRepository.findOne({ where: { user } });

      return technician; // Return the found technician or null if not found
    } catch (error) {
      console.error('An error occurred while finding technician:', error);
      return null; // Return null in case of an error
    }
  }


  findOneByID(id: number) { //este metodo es para el id de tecnico, no el id de usuario
    return this.technicianRepository.findOne({where: {id: id}});
  }

  
  async update(userId: string, updateTechnicianDto: UpdateTechnicianDto) {
    const technician=await this.findOneByUserId(userId);
    Object.assign(technician, updateTechnicianDto);
    return this.technicianRepository.save(technician);
  }

  remove(id: string) { //este metodo es para el id de tecnico, no el id de usuario
    return this.technicianRepository.delete(id);
  }
}
