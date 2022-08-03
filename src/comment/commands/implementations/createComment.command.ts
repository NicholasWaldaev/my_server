import CreateCommentDto from '../../../comment/dto/createComment.dto';
import User from '../../../user/entity/user.entity';

export class CreateCommentCommand {
  constructor(
    public readonly comment: CreateCommentDto,
    public readonly author: User,
  ) {}
}
