import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { UsersServiceModule } from './users-service.module';
import { RMQ_QUEUES } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_URL || 'amqp://localhost:5672'],
        queue: RMQ_QUEUES.USERS,
        queueOptions: { durable: true },
      },
    },
  );
  app.enableShutdownHooks();
  await app.listen();
}
bootstrap(); 
