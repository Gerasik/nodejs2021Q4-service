import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import TasksService from '../task/task.service';
import { ValidationPipe } from '../../common/validation.pipe';
import BoardsService from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { AuthGuard } from '../../services/auth/auth.guards';
import { HTTP_CODES } from '../../common/config';

@Controller('boards')
@UseGuards(AuthGuard)
export default class BoardsController {
  constructor(
    private readonly boardsService: BoardsService,
    private readonly tasksService: TasksService
  ) {}

  @Post()
  @HttpCode(HTTP_CODES.CREATED)
  create(@Body(new ValidationPipe()) createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateBoardDto: UpdateBoardDto
  ) {
    return this.boardsService.update(id, updateBoardDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.tasksService.removeByBoardId(id);

    await this.boardsService.remove(id);
  }
}
