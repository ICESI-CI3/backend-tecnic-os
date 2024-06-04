import { CreateAppointmentDto } from "src/appointment/dto/create-appointment.dto";

interface AppointmentData{
    technicianId: string;
    appointmentDTO: CreateAppointmentDto;
}


export const appointmentsSeed: AppointmentData[] = [

    {
        technicianId: "333333",
        appointmentDTO: {
            description: "Cita con técnico plumber, builder y electrician",
            technicianId: "111111",
            date: "2024-04-25",
            initTime: "10:00"
        }
    }
];
