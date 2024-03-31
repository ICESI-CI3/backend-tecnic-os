import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Technician } from "src/technicians/entities/technician.entity";
import { User } from "src/users/entities/user.entity"; 


export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3307,
    username: 'admin',
    password: 'admin',
    database: 'db_home_needs',
    autoLoadEntities: true,
    synchronize: true,
    entities: [User, Technician], 
    //TODO migrations: [] setear la carpeta db de migraciones
}