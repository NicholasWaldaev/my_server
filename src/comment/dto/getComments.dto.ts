import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

class GetCommentDto {
  @Type(() => Number)
  @IsOptional()
  postId?: number;
}

export default GetCommentDto;
