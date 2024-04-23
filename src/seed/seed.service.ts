import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { TechniciansService } from "src/technicians/technicians.service";
import { AppointmentService } from "src/appointment/appointment.service";
import { usersSeed } from "./data/users.seed";
import { techniciansSeed } from "./data/technician.seed";
import { appointmentsSeed } from "./data/appointment.seed";

@Injectable()
export class SeedService {
    constructor(
        private readonly usersService: UsersService,
        private readonly techniciansService: TechniciansService,
        private readonly appointmentService: AppointmentService
    ) {}
    
    async populateDB() {
        await this.usersService.fillUsersWithSeedData(usersSeed);
        await this.techniciansService.fillTechniciansWithSeedData(techniciansSeed);
        await this.appointmentService.fillAppointmentsWithSeedData(appointmentsSeed);
        return 'Database populated';
    }

    // This method will be called when the application starts
    async onModuleInit() {
        await this.populateDB();
    }
}