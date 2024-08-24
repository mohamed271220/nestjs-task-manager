import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('bootstrap'); // create a new instance of the logger
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor()); // to transform the response
  await app.listen(3000);
  logger.log(`Application listening on port 3000`); // log a message
}
// to run postgres on docker
//docker run --name postgres-nest -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres

// to stop the container
// docker container stop postgres-nest

// Start the application
bootstrap();
