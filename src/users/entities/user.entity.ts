import { Column, DeleteDateColumn, Entity } from 'typeorm';

@Entity()
export class User {

    @Column({ primary: true, nullable: false})
    id: string;

    @Column({nullable: false})
    name: string;

    @Column({ unique: true, nullable: false})
    email: string;

    @Column({nullable: false})
    password: string;

    @Column({ default: 'user' })
    role: string

    @Column({default: -1})
    rating: number;

    @DeleteDateColumn()
    deletedAt: Date;
}
