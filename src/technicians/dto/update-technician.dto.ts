import { PartialType } from '@nestjs/mapped-types';
import { CreateTechnicianDto } from './create-technician.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTechnicianDto extends PartialType(CreateTechnicianDto) {
  @IsOptional()
  tags: string;
  @IsOptional()
  description: string;
  @IsOptional()
  minimum_fee: number;
}
