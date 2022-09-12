import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { FindManyOptions, In, MoreThan, Repository } from 'typeorm';
import User from '../../user/entity/user.entity';

import { CreatePostDto } from '../dto/createPost.dto';
import { UpdatePostDto } from '../dto/updatePost.dto';
import PostNotFoundException from '../exception/postNotFound';
import Post from '../entity/post.entity';
import { GET_POST_CACHE_KEY } from '../postCacheKey.constant';
import PostSearchService from './postSearch.service';

@Injectable()
export default class PostService {
  private readonly logger = new Logger(PostService.name);
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private postSearchService: PostSearchService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async clearCache() {
    const keys: string[] = await this.cacheManager.store.keys();
    keys.forEach((key) => {
      if (key.startsWith(GET_POST_CACHE_KEY)) {
        this.cacheManager.del(key);
      }
    });
  }

  async getAllPosts(
    offset?: number,
    limit?: number,
    startId?: number,
    options?: FindManyOptions<Post>,
  ) {
    const where: FindManyOptions<Post>['where'] = {};
    let separateCount = 0;
    if (startId) {
      where.id = MoreThan(startId);
      separateCount = await this.postRepository.count();
    }

    const [items, count] = await this.postRepository.findAndCount({
      where,
      order: {
        id: 'ASC',
      },
      skip: offset,
      take: limit,
      ...options,
    });

    return {
      items,
      count: startId ? separateCount : count,
    };
  }

  async getPostsWithAuthors(offset?: number, limit?: number, startId?: number) {
    return this.getAllPosts(offset, limit, startId, {
      relations: ['author'],
    });
  }

  async getPostById(id: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (post) {
      return post;
    }
    this.logger.warn('Tried to access a post that does not exist');
    throw new PostNotFoundException(id);
  }

  async getPostsWithParagraph(paragraph: string) {
    return this.postRepository.query(
      `SELECT * from post WHERE $1 = ANY(parahraphs)`,
      [paragraph],
    );
  }

  async updatePost(id: number, post: UpdatePostDto) {
    await this.postRepository.update(id, post);
    const updatePost = await this.postRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (updatePost) {
      await this.postSearchService.update(updatePost);
      await this.clearCache();
      return updatePost;
    }
    throw new PostNotFoundException(id);
  }

  async createPost(post: CreatePostDto, user: User) {
    const newPost = await this.postRepository.create({
      ...post,
      author: user,
    });
    const savedPost = await this.postRepository.save(newPost);
    this.postSearchService.indexPost(savedPost);
    await this.clearCache();
    return savedPost;
  }

  async searchForPost(
    text: string,
    offset?: number,
    limit?: number,
    startId?: number,
  ) {
    const { result, count } = await this.postSearchService.search(
      text,
      offset,
      limit,
      startId,
    );
    const ids = result.map((result) => result.id);
    if (!ids.length) {
      return {
        items: [],
        count,
      };
    }

    const items = await this.postRepository.find({
      where: { id: In(ids) },
    });

    return {
      items,
      count,
    };
  }

  async deletePost(id: number) {
    const deleteResponse = await this.postRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new PostNotFoundException(id);
    }
    await this.postSearchService.remove(id);
    await this.clearCache();
  }
}
