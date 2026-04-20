import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EntityNotFoundInterceptor } from './interceptors/entity-not-found-interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Pipes
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));

  // Interceptors
  app.useGlobalInterceptors(new EntityNotFoundInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
