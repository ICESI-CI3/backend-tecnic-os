import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Technician extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  tags: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ nullable: false })
  minimum_fee: number;
}
