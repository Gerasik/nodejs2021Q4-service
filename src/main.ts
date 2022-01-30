import { WinstonModule } from 'nest-winston';
import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from './services/exceptions/http-exception.filter';
import { AppModule } from './app.module';
import loggerSettings from './services/logger/logger.settings';
import config from './common/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(loggerSettings),
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(config.PORT, config.APP_HOST);
}
bootstrap();
