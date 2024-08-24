import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';

// This is a simple entity class that represents a task.
@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid') // This is a decorator that tells TypeORM that this is the primary key and it should be generated automatically.
  id: string;
  @Column() // This is a decorator that tells TypeORM that this is a column in the database.
  title: string;
  @Column() // This is a decorator that tells TypeORM that this is a column in the database.
  description: string;
  @Column()
  status: TaskStatus;
  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false }) // This is a decorator that tells TypeORM that this is a many-to-one relationship with the User entity.
  @Exclude({ toPlainOnly: true }) // This is a decorator that tells class-transformer to exclude this property when converting the object to a plain object.
  user: User;
}
