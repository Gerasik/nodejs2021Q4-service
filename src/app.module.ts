import { Module, Logger, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerMiddleware } from './services/logger/logger.middleware';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import UsersModule from './module/user/user.module';
import TasksModule from './module/task/task.module';

import typeOrmConfig from './common/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...typeOrmConfig,
      autoLoadEntities: true,
    }),
    UsersModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
