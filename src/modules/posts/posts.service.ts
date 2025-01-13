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
    if (!postResponse || !postResponse.posts?.length) {
      this.logger.warn('No posts retrieved from the provider');
      return {
        count: 0,
        posts: [],
        moreRemaining: 0,
      };
    }

    const savedPosts = await this.postRepository.save(postResponse.posts);
    return {
      count: postResponse.posts.length,
      posts: savedPosts,
      moreRemaining: postResponse.moreAvailableResults,
    };
  }
}
