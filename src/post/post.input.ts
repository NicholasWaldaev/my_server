import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => [String])
  paragraphs: string[];

  @Field({ nullable: true })
  scheduledDate?: Date;
}
