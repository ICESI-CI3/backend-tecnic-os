import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { LargeNumberLike } from 'crypto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    rating: number;
    @IsOptional()
    id: string;
    @IsOptional()
    email: string;
    @IsOptional()
    password: string;
    @IsOptional()
    name: string;
    @IsOptional()
    role: string[];
    @IsOptional()
    rates_cont: number;
}