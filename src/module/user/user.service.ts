import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserAnswerDto } from './dto/update-user-answer.dto';

import User from './entities/user.entity';

import encryptPass from '../../services/auth/encrypt-pass';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UpdateUserAnswerDto> {
    const { login } = createUserDto;

    const userWithSameLogin: User | undefined = await this.findOneByLogin(
      login
    );

    if (userWithSameLogin)
      throw new BadRequestException(`Error! User with login ${login} exists!`);

    const encryptedPass = await encryptPass(createUserDto.password);

    const newUser = await this.repo.create({
      ...createUserDto,
      password: encryptedPass,
    });

    await this.repo.save(newUser);

    const userDataToReturn = new UpdateUserAnswerDto({ ...newUser });

    return userDataToReturn;
  }

  async findAll(): Promise<UpdateUserAnswerDto[]> {
    const users = await this.repo.find({ where: {} });

    const usersToReturn = users.map(
      (user) => new UpdateUserAnswerDto({ ...user })
    );

    return usersToReturn;
  }

  async findOne(id: string): Promise<UpdateUserAnswerDto> {
    const resultUser: User | undefined = await this.repo.findOne(id);

    if (!resultUser)
      throw new NotFoundException(`User with id:${id} not found`);

    const userToReturn = new UpdateUserAnswerDto({ ...resultUser });

    return userToReturn;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<UpdateUserAnswerDto> {
    const resultUser: User | undefined = await this.repo.findOne(id);

    if (!resultUser)
      throw new NotFoundException(`User with id:${id} not found`);

    await this.repo.update(id, updateUserDto);

    const updatedUser = await this.repo.findOne(id);

    if (!updatedUser)
      throw new InternalServerErrorException(
        `Error while updating user id:${id}`
      );

    const userDataToReturn = new UpdateUserAnswerDto({ ...updatedUser });

    return userDataToReturn;
  }

  async remove(id: string): Promise<void> {
    const resultUser: User | undefined = await this.repo.findOne(id);

    if (!resultUser)
      throw new NotFoundException(`User with id:${id} not found`);

    const deleteResult = await this.repo.delete(id);

    if (!deleteResult.affected)
      throw new InternalServerErrorException(
        `Error: user id:${id} has not been deleted`
      );
  }

  async findOneByLogin(login: string): Promise<User | undefined> {
    const userWithSameLogin = this.repo.findOne({ login });

    return userWithSameLogin;
  }
}
