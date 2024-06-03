import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ChangeRoleDto } from './dto/change-role.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOneByID(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateRating(id: string, updateUserDto: UpdateUserDto) {
    var inter={}
    const user=await this.userRepository.findOne({ where: { id } })
    const rating=Number(user.rating)
    const counter=user.rates_count + 1.0
    console.log("ALREADY HAVE RATINGGGG: ", rating); 
    console.log("APPOINTMENT RATING: ", updateUserDto.rating);

    if(rating == -1){
      inter={...updateUserDto, rates_count: counter}
    } else{
      const mean=(rating*(counter-1) + updateUserDto.rating)/counter
      console.log("MEANNNN: ", mean);
      inter={rating: mean, rates_count: counter}
      console.log(inter)
    }
    return this.userRepository.update(id, inter);
  }


  async updateRole(id: string, changeRoleDto: ChangeRoleDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    delete user.rating
    delete user.rates_count
    delete user.deletedAt
    console.log(user)
    return await this.userRepository.save({...user, role: changeRoleDto.role});
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
  
  async fillUsersWithSeedData(usersData: CreateUserDto[]) {

    const createdUsers = [];
    for (const userData of usersData) {
      try {
        const createdUser = await this.create(userData);
        createdUsers.push(createdUser);
      } catch (error) {
        console.error(`Error creating user: ${userData.name}`, error.message);
      }
    }
    return createdUsers;
  }
}
