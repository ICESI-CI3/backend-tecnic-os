import { IsArray, IsString, isArray } from 'class-validator';

export class CreateTechnicianDto {
  @IsString()
  tags: string;

  @IsString()
  description: string;

  @IsString()
  userId: string;
}
