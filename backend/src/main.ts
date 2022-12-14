import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Desconsidera qualquer elemento adicional aos dados
      transform: true, // Faz a transformação dos params e query quando são numeros ou outras coisas
    }),
  );

  await app.listen(3333);
}

void bootstrap();
