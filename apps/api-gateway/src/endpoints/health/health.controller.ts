import { Controller, Get, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheckService, HealthCheck } from '@nestjs/terminus';

@ApiTags('Health & Metrics')
@Controller('health')
export class HealthController {
  constructor(private health: HealthCheckService) {}

  @Version('1')
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([]);
  }
}
