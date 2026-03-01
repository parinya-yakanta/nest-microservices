import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/http-exception/http-exception.filter';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { correlationMiddleware } from './common/middleware/correlation.middleware';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  app.enableShutdownHooks();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      stopAtFirstError: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(correlationMiddleware);
  app.setGlobalPrefix('api', {
    exclude: ['/'],
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('Microservice Gateway API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
      displayRequestDuration: true,
      filter: true,
      showExtensions: true,
      defaultModelsExpandDepth: -1,
      persistAuthorization: true,
    },
    customSiteTitle: 'Microservice API Gateway',
  });

  await app.listen(3000);
}
bootstrap();
