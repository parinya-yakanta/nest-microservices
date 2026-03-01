import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { RMQ_NAME_SERVICES, RMQ_QUEUES } from '@app/shared';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RMQ_NAME_SERVICES.AUTH,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URL || 'amqp://localhost:5672'],
          queue: RMQ_QUEUES.AUTH,
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
