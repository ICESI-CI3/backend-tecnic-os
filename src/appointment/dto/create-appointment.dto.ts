import { IsDateString, IsString, Matches, MinLength } from "class-validator";

export class CreateAppointmentDto {
    @IsString()
    description: string;

    @IsString()
    @MinLength(6)
    technicianId: string;

    @IsDateString()
    date: string;

    @IsString()
    @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    initTime: string;
}
