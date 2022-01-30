import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TasksModule from '../task/task.module';
import TasksService from '../task/task.service';
import UsersService from './user.service';
import UsersController from './user.controller';
import User from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TasksModule],
  controllers: [UsersController],
  providers: [UsersService, TasksService],
  exports: [TypeOrmModule],
})
export default class UsersModule {}
