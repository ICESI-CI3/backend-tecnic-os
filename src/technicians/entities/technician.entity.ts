import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Technician extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false})
    description: string;

    @Column({nullable: false})
    tags: string;

    @OneToOne(() => User) 
    @JoinColumn()
    user: User;
}
