import { Controller, Get, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { collectDefaultMetrics, Registry } from 'prom-client';

const register = new Registry();
collectDefaultMetrics({ register });

@ApiTags('Health & Metrics')
@Controller('metrics')
export class MetricsController {
  @Version('1')
  @Get()
  async metrics() {
    return register.metrics();
  }
}
