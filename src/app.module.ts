import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AppointmentModule } from './appointment/appointment.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TechniciansModule } from './technicians/technicians.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    UsersModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    AppointmentModule,
    TechniciansModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
