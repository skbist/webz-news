import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { QueryPostDto } from './dto/query-post.dto';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from '../common/constants/api-constants';
import { PostProvider } from '../post-integration/interface/post-provder.interface';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @Inject('PostProvider') private readonly postProvider: PostProvider,
  ) {}
  async getPosts(queryPostDto: QueryPostDto) {
    const { search, pagination } = queryPostDto;
    const postResponse = await this.postProvider.fetchPosts(
      pagination.page ?? DEFAULT_PAGE,
      pagination.limit ?? DEFAULT_PAGE_SIZE,
      search,
    );

    await this.postRepository.save(postResponse.posts);
    return {
      count: postResponse.posts.length,
      moreRemaining: postResponse.moreAvailableResults,
    };
  }
}
