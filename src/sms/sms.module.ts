import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import SmsController from './sms.controller';
import SmsService from './sms.service';

@Module({
  imports: [ConfigModule, UserModule],
  controllers: [SmsController],
  providers: [SmsService],
})
export default class SmsModule {}
