import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TasksModule from '../task/task.module';
import TasksService from '../task/task.service';
import BoardsService from './board.service';
import BoardsController from './board.controller';
import Board from './entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), TasksModule],
  controllers: [BoardsController],
  providers: [BoardsService, TasksService],
})
export default class BoardsModule {}
