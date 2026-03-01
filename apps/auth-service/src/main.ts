import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RMQ_QUEUES } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_URL || 'amqp://localhost:5672'],
        queue: RMQ_QUEUES.AUTH,
        queueOptions: { durable: true },
      },
    },
  );
  app.enableShutdownHooks();
  await app.listen();
}
bootstrap();
