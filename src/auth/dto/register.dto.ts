import { Transform } from 'class-transformer';
import { IsEmail, IsString, Min, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(6)
  id: string;

  @IsString()
  @MinLength(1)
  name: string;

  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;
}
