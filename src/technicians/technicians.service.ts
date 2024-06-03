import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technician } from './entities/technician.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TechniciansService {
  constructor(
    @InjectRepository(Technician)
    private readonly technicianRepository: Repository<Technician>,
    private readonly userService: UsersService,
  ) {}

  async create(createTechnicianDto: CreateTechnicianDto): Promise<Technician> {
    try {
      // Busca el usuario por ID
      const user = await this.userService.findOneByID(
        createTechnicianDto.userId,
      );

      if (!user) {
        // Si el usuario no existe, lanza una excepción BadRequestException
        throw new BadRequestException('No user matches with id');
      }

      this.userService.updateRole(user.id, {role: ["technician"]})

      // Crea una instancia de Technician y la guarda en la base de datos
      const technician = this.technicianRepository.create({
        ...createTechnicianDto,
        user: user,
      });

      return await this.technicianRepository.save(technician);
    } catch (error) {
      // Captura cualquier error y relanza la excepción
      throw new BadRequestException(
        'Failed to create technician',
        error.message,
      );
    }
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
      const technician = await this.technicianRepository.findOne({
        where: { user },
      });

      return technician; // Return the found technician or null if not found
    } catch (error) {
      console.error('An error occurred while finding technician:', error);
      return null; // Return null in case of an error
    }
  }

  async findOneByID(id: string) {
    //este metodo es para el id de tecnico, no el id de usuario
    return this.technicianRepository.findOne({ where: { id: id } });
  }

  async update(userId: string, updateTechnicianDto: UpdateTechnicianDto) {
    const technician = await this.findOneByUserId(userId);
    Object.assign(technician, updateTechnicianDto);
    return this.technicianRepository.save(technician);
  }

  async remove(id: string) {
    //este metodo es para el id de tecnico, no el id de usuario
    return this.technicianRepository.delete(id);
  }

  async fillTechniciansWithSeedData(techniciansData: CreateTechnicianDto[] ) {
    const createdTechnicians = [];
    for (const technicianData of techniciansData){
      try{
        const createdTechnician = await this.create(technicianData);
        createdTechnicians.push(createdTechnician);
      }catch (error){
        console.error(`Error creating user: ${technicianData.userId}`, error.message);
      }
    }
  }
}
