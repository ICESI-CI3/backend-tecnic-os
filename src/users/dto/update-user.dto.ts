import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNumber, Max, Min } from 'class-validator';
import { LargeNumberLike } from 'crypto';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    rating: number;

    id: string;

    email: string;
  
    password: string;
  
    name: string;
  
    role: string[];

    rates_cont: number;
}