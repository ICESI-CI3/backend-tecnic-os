import { Technician } from "src/technicians/entities/technician.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({default: ""})
    description: string;

    @Column({ type: 'date' })
    date: string;

    @Column({ type: 'time' })
    initTime: string;

    @OneToOne(() => User) 
    @JoinColumn()
    technician: User;

    @OneToOne(() => User) 
    @JoinColumn()
    user: User;
}
