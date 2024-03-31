import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AppointmentModule } from './appointment/appointment.module';
import { Type } from 'class-transformer';
import { typeOrmConfig } from './config/typeorm.config';
import { TechniciansModule } from './technicians/technicians.module';


@Module({
  imports: [UsersModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    AppointmentModule,
    TechniciansModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
