/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const apiEndpoint = 'api';
  const docsEndpoint = 'docs';

  app.enableCors({
    origin: [
      'http://localhost:3001',
      'http://localhost:19006',
      configService.get('FRONTEND_URL'),
    ],
    credentials: true,
  });

  app.setGlobalPrefix(apiEndpoint);

  const config = new DocumentBuilder()
    .setTitle('Rent Easy 9ja API')
    .setDescription('API for Rent Easy 9ja - Property rental platform for Nigeria')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Authentication', 'User authentication endpoints')
    .addTag('Properties', 'Property management endpoints')
    .addTag('Applications', 'Rental application endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(docsEndpoint, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  const port = configService.get('PORT') || 3000;
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${apiEndpoint}`,
  );
  Logger.log(
    `📚 API Documentation available at: http://localhost:${port}/${docsEndpoint}`,
  );
}

bootstrap();
