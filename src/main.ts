import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import CustomLogger from './logger/customLogger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(CustomLogger));
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));
  app.use(cookieParser());

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get('FRONTEND_URL'),
    credentials: true,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API with NestJS')
    .setDescription('API developed throughout the API with NestJS course')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const port = configService.get('PORT') || 3000;

  await app.listen(Number(port));
}
bootstrap();
