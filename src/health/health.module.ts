import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { SearchModule } from 'src/search/search.module';
import { ElasticsearchHealthIndicator } from './elasticsearchHealthIndicator';
import HealthController from './health.controller';

@Module({
  imports: [TerminusModule, SearchModule],
  controllers: [HealthController],
  providers: [ElasticsearchHealthIndicator],
})
export default class HealthModule {}
