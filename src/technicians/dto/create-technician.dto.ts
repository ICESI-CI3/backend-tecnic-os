import { IsArray, IsNumber, IsString, isArray } from 'class-validator';

export class CreateTechnicianDto {
  @IsString()
  tags: string;

  @IsString()
  description: string;

  @IsString()
  userId: string;

  @IsNumber()
  minimum_fee: number;
}
