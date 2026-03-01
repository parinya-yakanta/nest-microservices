import { Module } from '@nestjs/common';
import { UsersModule } from './endpoints/users/users.module';
import { HealthModule } from './endpoints/health/health.module';
import { AuthModule } from './endpoints/auth/auth.module';
import { MetricsModule } from './endpoints/metrics/metrics.module';

@Module({
  imports: [UsersModule, HealthModule, AuthModule, MetricsModule],
})
export class ApiGatewayModule {}
