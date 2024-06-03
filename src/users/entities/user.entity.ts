import { Column, Decimal128, DeleteDateColumn, Entity } from 'typeorm';

@Entity()
export class User {

    @Column({ primary: true, nullable: false})
    id: string;

    @Column('text', {nullable: false})
    name: string;

    @Column('text', { unique: true, nullable: false})
    email: string;

    @Column('text', {nullable: false})
    password: string;

    @Column('text',{array: true})
    role: string[];

    @Column({type: 'decimal', default: -1})
    rating: number;

    @Column({default: 0})
    rates_count: number;

    @DeleteDateColumn()
    deletedAt: Date;
}
