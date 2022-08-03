import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModuleAsyncOptions } from '@nestjs/elasticsearch';

export const elasticSearchModuleOptions: ElasticsearchModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    node: configService.get('ELASTICSEARCH_NODE'),
    auth: {
      username: configService.get('ELASTICSEARCH_USERNAME'),
      password: configService.get('ELASTICSEARCH_PASSWORD'),
    },
  }),
};
