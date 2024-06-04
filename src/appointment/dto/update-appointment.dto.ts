import { PartialType } from '@nestjs/mapped-types';
import { IsString } from "class-validator";
import { CreateAppointmentDto } from './create-appointment.dto';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
    @IsString()
    status: string;
}
