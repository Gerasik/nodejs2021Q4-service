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
import { HTTP_CODES } from '../../common/config';
import { ValidationPipe } from '../../common/validation.pipe';
import UserService from './user.service';
import TaskService from '../task/task.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../../services/auth/auth.guards';

@Controller('users')
@UseGuards(AuthGuard)
export default class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly taskService: TaskService
  ) {
    // Initial admin for tests
    const adminDto: CreateUserDto = {
      name: 'admin',
      login: 'admin',
      password: 'admin',
    };

    (async () => {
      const admin = await this.userService.findOneByLogin(adminDto.login);
      if (!admin) await this.userService.create(adminDto);
    })();
  }

  @Post()
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HTTP_CODES.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.userService.remove(id);

    await this.taskService.unassgnTasks(id);
  }
}
