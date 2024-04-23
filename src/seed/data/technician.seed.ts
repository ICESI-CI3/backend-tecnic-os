import { CreateTechnicianDto } from "src/technicians/dto/create-technician.dto";

export const techniciansSeed: CreateTechnicianDto[] = [
    {
        tags: "#plumber",
        description: "Technician description",
        userId: "333333"
    },
    {
        tags: "#builder#plumber#electrician",
        description: "Technician description",
        userId: "222222"
    }
];