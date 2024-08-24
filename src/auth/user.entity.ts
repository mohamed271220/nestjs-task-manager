import { Task } from 'src/tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true }) // This will create a unique index in the database
  username: string;

  @Column()
  password: string;

  // one to many relation (type of relation, type of entity, inverse side of the relation)
  @OneToMany((_type) => Task, (task) => task.user, { eager: true }) // eager loading: when we load a user, we want to load all the tasks associated with that user
  tasks: Task[];
}
