import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  //(in modules, while forRoot() is used in the root module)
  imports: [TypeOrmModule.forFeature([Task]), AuthModule], // import the TypeOrmModule and use the forFeature() method to define which repositories are registered in the current scope
  // import the TaskRepository which contains the methods to interact with the database
  // it's a provider because it's a service that can be injected into other services
  providers: [TasksService, TasksRepository],
  controllers: [TasksController],
})
export class TasksModule {}
