import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsException } from '@nestjs/websockets';
import { parse } from 'cookie';
import { Socket } from 'socket.io';
import { AuthenticationService } from '../authentication/authentication.service';
import User from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import Message from './massage.entity';

@Injectable()
export class ChatService {
  constructor(
    private readonly authenticationService: AuthenticationService,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async saveMessage(content: string, author: User) {
    const newMessage = await this.messageRepository.create({
      content,
      author,
    });
    await this.messageRepository.save(newMessage);
    return newMessage;
  }

  async getAllMessage() {
    return this.messageRepository.find({
      relations: ['author'],
    });
  }

  async getUserFromSocket(socket: Socket) {
    const cookie = socket.handshake.headers.cookie;
    const { Authentication: token } = parse(cookie);

    const user =
      await this.authenticationService.getUserFromAuthenticationToken(token);

    if (!user) {
      throw new WsException('Invalid credentials.');
    }
    return user;
  }
}
