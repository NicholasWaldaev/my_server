import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import Post from './post/entity/post.entity';
import { DataSource } from 'typeorm';
import User from './user/entity/user.entity';
import DatabaseFile from './files/databaseFile.entity';
import Address from './user/entity/address.entity';
import Category from './category/category.entity';
import Comment from './comment/comment.entity';
import { InitProject1667922267459 } from '../migrations/1667922267459-InitProject';
import Log from './logger/log.entity';
import { CreateLog1667922959768 } from '../migrations/1667922959768-CreateLog';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [Post, User, DatabaseFile, Address, Category, Comment, Log],
  migrations: [InitProject1667922267459, CreateLog1667922959768],
});
