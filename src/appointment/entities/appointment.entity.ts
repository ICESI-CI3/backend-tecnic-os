import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(() => User) 
    @JoinColumn()
    technician: User;

    @ManyToOne(() => User) 
    @JoinColumn()
    user: User;
}
