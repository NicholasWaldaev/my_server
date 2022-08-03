import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import Comment from '../../../comment/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentCommand } from '../implementations/createComment.command';

@CommandHandler(CreateCommentCommand)
export class CreateCommantHandler
  implements ICommandHandler<CreateCommentCommand>
{
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async execute(command: CreateCommentCommand) {
    const newPost = await this.commentRepository.create({
      ...command.comment,
      author: command.author,
    });
    await this.commentRepository.save(newPost);
    return newPost;
  }
}
