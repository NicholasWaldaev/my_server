import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { ElasticsearchHealthIndicator } from './elasticsearchHealthIndicator';

@Controller('health')
class HealthController {
  constructor(
    private healthCheckService: HealthCheckService,
    private typeOrmHealthIndicator: TypeOrmHealthIndicator,
    private memoryHealthIndicator: MemoryHealthIndicator,
    private diskHealthIndicator: DiskHealthIndicator,
    private elasticsearchHealthIndicator: ElasticsearchHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      () => this.typeOrmHealthIndicator.pingCheck('database'),
      () =>
        this.memoryHealthIndicator.checkHeap('memory heap', 300 * 1024 * 1024),
      () =>
        this.memoryHealthIndicator.checkRSS('memory RSS', 300 * 1024 * 1024),
      () =>
        this.diskHealthIndicator.checkStorage('storage', {
          thresholdPercent: 250 * 1024 * 1024 * 1024,
          path: '/',
        }),
      () => this.elasticsearchHealthIndicator.isHealthy('elasticsearch'),
    ]);
  }
}

export default HealthController;
