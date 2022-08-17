import * as Joi from '@hapi/joi';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import * as path from 'path';

import { BullModule } from '@nestjs/bull';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthenticationModule } from './authentication/authentication.module';
import { CategoryModule } from './category/category.module';
import { ChatModule } from './chat/chat.module';
import { CommentModule } from './comment/comment.module';
import { DatabaseModule } from './database/database.module';
import { EmailModule } from './email/email.module';
import { EmailSchedulingModule } from './emailSchedule/emailSchedule.module';
import { OptimizeModule } from './optimize/optimize.module';
import { PostModule } from './post/post.module';
import { ProductModule } from './product/product.module';
import { ProductCategoryModule } from './productCategory/productCategory.module';
import { PubSubModule } from './pubSub/pubSub.module';
import { SearchModule } from './search/search.module';
import { SubscribersModule } from './subscribers/subscribers.module';
import { UserModule } from './user/user.module';
import { Timestamp } from './utils/timestamp.scalar';
import SmsModule from './sms/sms.module';
import { EmailConfirmationModule } from './emailConfermation/emailConfirmation.module';
import HealthModule from './health/health.module';
import { DatabaseFileModule } from './files/databaseFile.module';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: Number(configService.get('REDIS_PORT')),
        },
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        playground: Boolean(configService.get('GRAPHQL_PLAYGROUND')),
        autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
        installSubscriptionHandlers: true,
        buildSchemaOptions: {
          dateScalarMode: 'timestamp',
        },
      }),
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_VERIFICATION_TOKEN_SECRET: Joi.string().required(),
        JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        EMAIL_CONFIRMATION_URL: Joi.string().required(),
        GRAPHQL_PLAYGROUND: Joi.number(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_ASSESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        EMAIL_SERVICE: Joi.string().required(),
        EMAIL_USER: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),
        FRONTEND_URL: Joi.string(),
        TWILIO_ACCOUNT_SID: Joi.string().required(),
        TWILIO_AUTH_TOKEN: Joi.string().required(),
        TWILIO_VERIFICATION_SERVICE_SID: Joi.string().required(),
      }),
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    PostModule,
    AuthenticationModule,
    UserModule,
    CategoryModule,
    SearchModule,
    SubscribersModule,
    CommentModule,
    ProductCategoryModule,
    ProductModule,
    EmailModule,
    EmailSchedulingModule,
    ChatModule,
    PubSubModule,
    OptimizeModule,
    SmsModule,
    EmailConfirmationModule,
    HealthModule,
    DatabaseFileModule,
  ],
  controllers: [],
  providers: [Timestamp],
})
export class AppModule {}
