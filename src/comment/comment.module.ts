import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCommantHandler } from './commands/handlers/create-comment.handlers';
import CommentController from './comment.controller';
import Comment from './comment.entity';
import { GetCommentsHandler } from './queries/handlers/getComments.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), CqrsModule],
  controllers: [CommentController],
  providers: [CreateCommantHandler, GetCommentsHandler],
})
export class CommentModule {}
