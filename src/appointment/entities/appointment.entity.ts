import { Technician } from "src/technicians/entities/technician.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({nullable: false})
    description: string;

    @Column({nullable: false})
    technicianId: string;

    @Column({nullable: false})
    userId: string;

    @OneToOne(() => Technician) 
    @JoinColumn()
    technician: Technician;

    @OneToOne(() => User) 
    @JoinColumn()
    user: User;
}
