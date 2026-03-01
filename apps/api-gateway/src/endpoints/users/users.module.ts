import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersController } from './users.controller';
import { RMQ_NAME_SERVICES, RMQ_QUEUES } from '@app/shared';
import { AuthLibModule } from '@app/auth';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RMQ_NAME_SERVICES.USERS,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URL || 'amqp://localhost:5672'],
          queue: RMQ_QUEUES.USERS,
          queueOptions: { durable: true },
        },
      },
    ]),
    AuthLibModule,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
