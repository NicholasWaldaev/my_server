import { Inject, UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  Info,
  Subscription,
} from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import {
  parseResolveInfo,
  ResolveTree,
  simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { GraphqlJwtAuthGuard } from '../authentication/guard/graphql-jwt-auth.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';
import { PUB_SUB } from '../pubSub/pubSub.module';
import { Post } from './model/post.model';
import { CreatePostInput } from './post.input';
import PostService from './services/post.service';

const POST_ADDED_EVENT = 'postAdded';
@Resolver(() => Post)
export class PostResolver {
  constructor(
    private postService: PostService,
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
  ) {}

  @Subscription(() => Post)
  postAdded() {
    return this.pubSub.asyncIterator(POST_ADDED_EVENT);
  }

  @Query(() => [Post])
  async post(@Info() info: GraphQLResolveInfo) {
    const parsedInfo = parseResolveInfo(info) as ResolveTree;
    const simplifiedInfo = simplifyParsedResolveInfoFragmentWithType(
      parsedInfo,
      info.returnType,
    );

    const post =
      'author' in simplifiedInfo.fields
        ? await this.postService.getPostsWithAuthors()
        : await this.postService.getAllPosts();
    return post.items;
  }

  @Mutation(() => Post)
  @UseGuards(GraphqlJwtAuthGuard)
  async createPost(
    @Args('input') createPostInput: CreatePostInput,
    @Context() context: { req: RequestWithUser },
  ) {
    const newPost = await this.postService.createPost(
      createPostInput,
      context.req.user,
    );
    this.pubSub.publish(POST_ADDED_EVENT, { postAdded: newPost });
    return newPost;
  }
}
