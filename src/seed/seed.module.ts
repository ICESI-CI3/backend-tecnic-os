import {Module} from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UsersModule } from 'src/users/users.module';
import { TechniciansModule } from 'src/technicians/technicians.module';
import { AppointmentModule } from 'src/appointment/appointment.module';


@Module({
    controllers: [SeedController],
    providers: [SeedService],
    imports: [UsersModule, TechniciansModule, AppointmentModule]
})

export class SeedModule {}