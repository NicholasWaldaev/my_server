import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
  Info,
} from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import {
  parseResolveInfo,
  ResolveTree,
  simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info';

import { GraphqlJwtAuthGuard } from 'src/authentication/guard/graphql-jwt-auth.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import { User } from 'src/user/model/user.model';
import { Post } from './model/post.model';
import { CreatePostInput } from './post.input';
import PostLoaders from './post.loaders';
import PostService from './services/post.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private postService: PostService,
    private postLoaders: PostLoaders,
  ) {}

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

  @ResolveField('author', () => User)
  async getAuthor(@Parent() post: Post) {
    const { authorId } = post;

    return this.postLoaders.batchAuthors.load(authorId);
  }

  @Mutation(() => Post)
  @UseGuards(GraphqlJwtAuthGuard)
  async createPost(
    @Args('input') createPostInput: CreatePostInput,
    @Context() context: { req: RequestWithUser },
  ) {
    return this.postService.createPost(createPostInput, context.req.user);
  }
}
