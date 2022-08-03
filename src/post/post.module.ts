import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';

import { SearchModule } from '../search/search.module';
import PostsController from './post.controller';
import Post from './entity/post.entity';
import PostService from './services/post.service';
import PostSearchService from './services/postSearch.service';
import { PostResolver } from './post.resolver';
import { UserModule } from 'src/user/user.module';
import PostLoaders from './post.loaders';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        ttl: 120,
      }),
    }),
    TypeOrmModule.forFeature([Post]),
    SearchModule,
    UserModule,
  ],
  controllers: [PostsController],
  providers: [PostService, PostSearchService, PostResolver, PostLoaders],
  exports: [],
})
export class PostModule {}
