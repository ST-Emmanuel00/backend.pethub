import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { corsValues, envValues } from './common/config';
import { ExceptionsFilter } from './common/filter/exception.filter';

async function bootstrap() {
  const logger = new Logger('Server');
  const app = await NestFactory.create(AppModule);
  const { port } = envValues;

  app.enableCors(corsValues);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  app.setGlobalPrefix('v1');
  
  app.useGlobalFilters(new ExceptionsFilter())

  await app.listen(port);
  logger.log(`Server running on port ${port}`);


}
bootstrap();
