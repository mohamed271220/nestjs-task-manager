// import { EntityRepository, Repository } from 'typeorm';
// import { Task } from './task.entity';

// This is a repository class that will be responsible for all the database operations related to tasks.
// it has access to all the methods that TypeORM provides to interact with the database.
// https://typeorm.io/repository-api - TypeORM Repository API
// @EntityRepository(Task)
// export class TaskRepository extends Repository<Task> {}
// import { Repository } from 'typeorm';
// import { Task } from './task.entity';

// export class TaskRepository extends Repository<Task> {}

import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filters';
import { User } from 'src/auth/user.entity';
import { Logger } from '@nestjs/common';

@Injectable()
export class TasksRepository extends Repository<Task> {
  private logger = new Logger('TasksRepository', { timestamp: true });
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(filterData: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterData;
    const query = this.createQueryBuilder('task'); // alias
    query.where({ user });
    if (status) {
      query.andWhere('task.status = :status', { status: status }); // :status is a placeholder or variable
    }
    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      // log the error
      this.logger.error(
        `Failed to get tasks for user "${user.username}". Filters: ${JSON.stringify(
          filterData,
        )}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to get tasks');
    }
    // const tasks = await query.getMany();
    // return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    await this.save(task);
    return task;
  }
}
