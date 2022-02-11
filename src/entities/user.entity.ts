import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Tasks } from './task.entity';

@Entity()
@Unique(['email'])
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  salt: string;
  @OneToMany((type) => Tasks, (task) => task.user, { eager: true })
  tasks: Tasks[];

  async validatePasswrord(password): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash == this.password;
  }
}
