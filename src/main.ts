import { WinstonModule } from 'nest-winston';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { INestApplication } from '@nestjs/common';
import { HttpExceptionFilter } from './services/exceptions/http-exception.filter';
import { AppModule } from './app.module';
import loggerSettings from './services/logger/logger.settings';
import config from './common/config';

async function bootstrap() {
  let app: NestFastifyApplication | INestApplication;

  if (config.USE_FASTIFY) {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
      {
        logger: WinstonModule.createLogger(loggerSettings),
      }
    );
  } else {
    app = await NestFactory.create<INestApplication>(AppModule, {
      logger: WinstonModule.createLogger(loggerSettings),
    });
  }

  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(config.PORT, config.APP_HOST);
}
bootstrap();
