import { CreateAppointmentDto } from "src/appointment/dto/create-appointment.dto";

interface AppointmentData{
    userId: string;
    appointmentDTO: CreateAppointmentDto;
}


export const appointmentsSeed: AppointmentData[] = [
    {
        userId: "222222",
        appointmentDTO: {
            description: "Cita con técnico plumber",
            technicianId: "111111",
            date: "2024-04-24",
            initTime: "09:00"
        }
    },
    {
        userId: "333333",
        appointmentDTO: {
            description: "Cita con técnico plumber, builder y electrician",
            technicianId: "111111",
            date: "2024-04-25",
            initTime: "10:00"
        }
    }
];
