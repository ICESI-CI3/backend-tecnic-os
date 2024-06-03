import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsArray, IsNumber, IsString, Max, Min } from 'class-validator';
import { LargeNumberLike } from 'crypto';

export class ChangeRoleDto extends PartialType(CreateUserDto) {
    @IsArray()
    role: string[];
}