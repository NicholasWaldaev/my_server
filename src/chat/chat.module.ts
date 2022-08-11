import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from '../authentication/authentication.module';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import Message from './massage.entity';

@Module({
  imports: [AuthenticationModule, TypeOrmModule.forFeature([Message])],
  controllers: [],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
