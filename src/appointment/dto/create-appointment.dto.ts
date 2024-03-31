import { IsString, MinLength } from "class-validator";

export class CreateAppointmentDto {
    @IsString()
    description: string; 

    @IsString()
    @MinLength(6)
    userId: string;
}
