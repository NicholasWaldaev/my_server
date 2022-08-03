import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  scheduledDate?: Date;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => [String])
  paragraphs: string[];

  @Field(() => Int)
  authorId: number;
}
