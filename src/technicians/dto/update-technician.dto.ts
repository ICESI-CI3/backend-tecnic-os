import { PartialType } from '@nestjs/mapped-types';
import { CreateTechnicianDto } from './create-technician.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateTechnicianDto extends PartialType(CreateTechnicianDto) {
  @IsString()
  tags: string;

  @IsString()
  description: string;

  @IsNumber()
  minimum_fee: number;
}
