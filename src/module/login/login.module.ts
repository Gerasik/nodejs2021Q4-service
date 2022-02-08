import { Module } from '@nestjs/common';
import UsersModule from '../user/user.module';
import UsersService from '../user/user.service';
import LoginService from './login.service';
import LoginController from './login.controller';

@Module({
  imports: [UsersModule],
  controllers: [LoginController],
  providers: [LoginService, UsersService],
})
export default class LoginModule {}
