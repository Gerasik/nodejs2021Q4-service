import { Module, Logger, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerMiddleware } from './services/logger/logger.middleware';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import UserModule from './module/user/user.module';
import TaskModule from './module/task/task.module';
import LoginModule from './module/login/login.module';
import BoardModule from './module/board/board.module';
import FileModule from './module/file/file.module';

import typeOrmConfig from './common/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...typeOrmConfig,
      autoLoadEntities: true,
    }),
    UserModule,
    LoginModule,
    TaskModule,
    BoardModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
