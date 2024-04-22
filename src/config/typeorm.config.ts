import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Technician } from 'src/technicians/entities/technician.entity';
import { User } from 'src/users/entities/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  synchronize: true,
  ssl: process.env.DB_SSL === 'true',
  extra: {
    ssl:
      process.env.DB_SSL === 'true'
        ? { rejectUnauthorized: false }
        : null,
  },
  entities: [User, Technician],
};
