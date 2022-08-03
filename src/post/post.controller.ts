import {
  Body,
  CacheKey,
  CacheTTL,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PaginationParams } from '../utils/types/paginationParams';
import JwtAuthenticationGuard from '../authentication/guard/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';
import FindOneParams from '../utils/findOneParams';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import PostService from './services/post.service';
import { GET_POST_CACHE_KEY } from './postCacheKey.constant';
import { HttpCacheInterceptor } from './httpCache.interceptor';

@Controller('post')
@UseInterceptors(ClassSerializerInterceptor)
export default class PostsController {
  constructor(private readonly postService: PostService) {}

  @UseInterceptors(HttpCacheInterceptor)
  @CacheKey(GET_POST_CACHE_KEY)
  @CacheTTL(120)
  @Get()
  getAllPosts(
    @Query('search') search: string,
    @Query() { offset, limit, startId }: PaginationParams,
  ) {
    if (search) {
      return this.postService.searchForPost(search, offset, limit, startId);
    }
    return this.postService.getAllPosts(offset, limit);
  }

  @Get(':id')
  getPostById(@Param() { id }: FindOneParams) {
    return this.postService.getPostById(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createPost(@Body() post: CreatePostDto, @Req() req: RequestWithUser) {
    return this.postService.createPost(post, req.user);
  }

  @Patch(':id')
  async replacePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postService.updatePost(Number(id), post);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    this.postService.deletePost(Number(id));
  }
}
