import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Technician } from "src/technicians/entities/technician.entity";
import { User } from "src/users/entities/user.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5433, 
    username: 'postgres', 
    password: 'postgres', 
    database: 'homeneeds_db', 
    autoLoadEntities: true,
    synchronize: true, 
    entities: [User, Technician],
}
