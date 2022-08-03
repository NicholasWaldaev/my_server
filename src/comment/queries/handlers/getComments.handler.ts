import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import Comment from '../../../comment/comment.entity';
import { Repository } from 'typeorm';
import { GetCommentQuery } from '../implementations/getComments.query';

@QueryHandler(GetCommentQuery)
export class GetCommentsHandler implements IQueryHandler<GetCommentQuery> {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async execute(query: GetCommentQuery) {
    if (query.postId) {
      return this.commentsRepository.findBy({
        post: {
          id: query.postId,
        },
      });
    }
    return this.commentsRepository.find();
  }
}
